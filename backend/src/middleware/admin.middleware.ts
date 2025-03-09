import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

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

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get user from auth middleware
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Check if user exists and is admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
