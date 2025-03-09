import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export interface IUser {
  email: string;
  password?: string;
  name: string;
  role: 'user' | 'admin' | 'editor';
  googleId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends mongoose.Model<IUser> {
  initializeAdmin(): Promise<void>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId;
      },
      minlength: 6,
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'editor'],
      default: 'user',
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  // Get the full user document with password
  const user = await User.findById(this._id).select('+password');
  if (!user || !user.password) return false;
  return bcrypt.compare(candidatePassword, user.password);
};

// Initialize admin user if it doesn't exist
userSchema.statics.initializeAdmin = async function() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.warn(' Admin credentials not found in environment variables');
      return;
    }

    // Check if admin exists, including password field
    const adminExists = await this.findOne({ email: adminEmail }).select('+password');
    
    if (!adminExists) {
      // Create new admin user
      await this.create({
        email: adminEmail,
        password: adminPassword, // Will be hashed by pre-save hook
        name: 'Admin',
        role: 'admin',
      });
      console.log(' Admin user created successfully');
    } else {
      // Check if admin password needs updating
      const isPasswordCorrect = await bcrypt.compare(adminPassword, adminExists.password || '');
      if (!isPasswordCorrect) {
        adminExists.password = adminPassword;
        await adminExists.save();
        console.log(' Admin password updated successfully');
      } else {
        console.log(' Admin user already exists with correct credentials');
      }
    }
  } catch (error) {
    console.error(' Error initializing admin user:', error);
    throw error; // Propagate error to be handled by the caller
  }
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);

// Initialize admin user when the model is loaded
User.initializeAdmin().catch(error => {
  console.error(' Failed to initialize admin user:', error);
});
