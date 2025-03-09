import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Register attempt:', { email: req.body.email, name: req.body.name });
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists');
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: 'user', // Default role
    });
    console.log('User created successfully:', { id: user._id, email: user.email });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    const { email, password } = req.body;

    // Check if user exists and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Login failed: User not found');
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // For users created via Google OAuth
    if (!user.password) {
      console.log('Login failed: Account requires Google authentication');
      res.status(401).json({ message: 'Please login with Google' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Invalid password');
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('Login successful:', { id: user._id, email: user.email, role: user.role });

    // Generate token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('Google auth attempt');
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload()!;
    console.log('Google auth payload:', { email, name, googleId });

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Check if this is the admin email
      const isAdminEmail = email === process.env.ADMIN_EMAIL;
      
      user = await User.create({
        email,
        name,
        googleId,
        avatar: picture,
        role: isAdminEmail ? 'admin' : 'user', // Set admin role if matches admin email
      });
      console.log('New user created from Google auth:', { id: user._id, email: user.email, role: user.role });
    } else {
      // Update existing user's Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
      console.log('Existing user found from Google auth:', { id: user._id, email: user.email, role: user.role });
    }

    // Generate token with role
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      data: {
        token: jwtToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    next(error);
  }
};
