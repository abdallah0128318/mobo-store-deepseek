import express from 'express';
import { register } from '../controllers/authController';
import { validateRegistration } from '../middlewares/validation';

const router = express.Router();

router.post('/register', validateRegistration, register);

export default router;