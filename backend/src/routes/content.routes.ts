import express from 'express';
import { contentController } from '../controllers/content.controller';
import { protect } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// Public endpoint for API information
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Content API is running',
    note: 'Authentication required for content management',
    endpoints: {
      getAll: 'GET /all (Protected)',
      getById: 'GET /:id (Protected)',
      create: 'POST / (Admin)',
      update: 'PUT /:id (Admin)',
      delete: 'DELETE /:id (Admin)'
    }
  });
});

// Protected routes
router.get('/all', protect, contentController.getAll);
router.get('/:id', protect, contentController.getById);

// Admin-only routes
router.post('/', protect, isAdmin, contentController.create);
router.put('/:id', protect, isAdmin, contentController.update);
router.delete('/:id', protect, isAdmin, contentController.delete);

export default router;
