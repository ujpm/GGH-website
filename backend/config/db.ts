import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

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
    
    // Connect to MongoDB Atlas with proper options
    await mongoose.connect(MONGODB_URI, {
      // These options help with connection stability
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    
    // Initialize admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('⚠️ Admin credentials not found in environment variables');
      return;
    }

    // Check if admin exists
    const User = mongoose.model('User');
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      // Update admin role if needed
      if (adminExists.role !== 'admin') {
        await User.findByIdAndUpdate(adminExists._id, { role: 'admin' });
        console.log('✅ Admin role updated');
      }
    } else {
      // Create admin user
      await User.create({
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        name: 'Admin',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
