import express from 'express';
import { 
  getFundingCalls, 
  getFundingCall,
  createFundingCall,
  updateFundingCall,
  deleteFundingCall,
  getFundingStats
} from '../../controllers/fundingController';
import { isAdmin } from '../../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getFundingCalls);
router.get('/stats', getFundingStats);
router.get('/:id', getFundingCall);

// Protected routes (admin only)
router.post('/', isAdmin, createFundingCall);
router.put('/:id', isAdmin, updateFundingCall);
router.delete('/:id', isAdmin, deleteFundingCall);

export default router;
