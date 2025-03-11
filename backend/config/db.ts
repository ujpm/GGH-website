import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { seedFundingCalls } from './seedData';

dotenv.config();

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    
    // Connect to MongoDB Atlas with proper options for Mongoose 7
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      ssl: true
    });

    console.log('✅ Successfully connected to MongoDB Atlas');

    // Initialize admin user if in development
    if (process.env.NODE_ENV !== 'production') {
      try {
        const User = mongoose.model('User');
        const adminExists = await User.findOne({ email: 'admin@globalgrantshub.org' });
        
        if (!adminExists) {
          const hashedPassword = await bcrypt.hash('admin123', 10);
          await User.create({
            name: 'Admin',
            email: 'admin@globalgrantshub.org',
            password: hashedPassword,
            role: 'admin'
          });
          console.log('✅ Admin user created successfully');
        }
      } catch (error) {
        console.error('Error initializing admin user:', error);
      }
    }

    // Seed funding calls in development
    if (process.env.NODE_ENV !== 'production') {
      try {
        await seedFundingCalls();
        console.log('✅ Funding calls seeded successfully');
      } catch (error) {
        console.error('Error seeding funding calls:', error);
      }
    }

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};
