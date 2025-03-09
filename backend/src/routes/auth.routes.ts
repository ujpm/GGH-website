import express from 'express';
import { register, login, googleAuth } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);

export default router;
