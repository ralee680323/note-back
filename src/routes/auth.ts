import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth';

const router = express.Router();

// Validation middleware
const validateAuth = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);

export default router; 