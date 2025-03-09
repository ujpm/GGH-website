import express from 'express';
import { 
  getFundingCalls, 
  getFundingCall,
  createFundingCall,
  updateFundingCall,
  deleteFundingCall,
  getFundingStats
} from '../controllers/fundingController';
import { isAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/funding-calls', getFundingCalls);
router.get('/funding-calls/:id', getFundingCall);
router.get('/funding-stats', getFundingStats);

// Protected routes (admin only)
router.post('/funding-calls', isAdmin, createFundingCall);
router.put('/funding-calls/:id', isAdmin, updateFundingCall);
router.delete('/funding-calls/:id', isAdmin, deleteFundingCall);

export default router;
