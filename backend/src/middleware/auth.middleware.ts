import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

interface JwtPayload {
  userId: string;
  role: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: string;
      };
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ error: 'Not authorized to access this route' });
      return;
    }

    try {
      // Verify token
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Get user from token
      const user = await User.findById(decoded.userId)
        .select('-password')
        .lean();

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      // Add user to request object
      req.user = {
        _id: user._id.toString(),
        role: user.role
      };

      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized to access this route' });
      return;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        error: `User role ${req.user?.role} is not authorized to access this route`
      });
      return;
    }
    next();
  };
};
