import express from 'express';
import { contentController } from '../controllers/content.controller';
import { protect } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// All routes require authentication and admin access
router.use(protect);
router.use(isAdmin);

// Content management routes
router.get('/', contentController.getAll);
router.get('/:id', contentController.getById);
router.post('/', contentController.create);
router.put('/:id', contentController.update);
router.delete('/:id', contentController.delete);

export default router;
