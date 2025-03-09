import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string; role: string };

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = decoded;
    return next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
