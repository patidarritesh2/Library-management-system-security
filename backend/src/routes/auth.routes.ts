
import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';

const router = Router();

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage('Role must be admin or user')
];

const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', registerValidation, authController.register);

router.post('/login', loginValidation, authController.login);

export default router;
