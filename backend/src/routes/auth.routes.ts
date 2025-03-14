import express from 'express';
import { register, login, googleAuth, getCurrentUser } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Root endpoint for API health check
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Auth API is running',
    endpoints: {
      register: 'POST /register',
      login: 'POST /login',
      google: 'POST /google',
      me: 'GET /me'
    }
  });
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router;
