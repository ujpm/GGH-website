import express from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/admin.middleware';

const router = express.Router();

// All dashboard routes require authentication and admin access
router.use(protect);
router.use(isAdmin);

// Dashboard routes
router.get('/stats', dashboardController.getStats);
router.get('/activity', dashboardController.getActivity);
router.patch('/content/:id/status', dashboardController.updateStatus);
router.post('/content/bulk-delete', dashboardController.bulkDelete);

export default router;
