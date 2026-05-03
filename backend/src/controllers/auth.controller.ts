import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password, role } = req.body;

  try {
    const user = await authService.registerUser(username, password, role);
    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error: any) {
    if (error.message === 'Username already exists') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  try {
    const result = await authService.loginUser(username, password);

    res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user
    });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(500).json({ message: 'Server error during login' });
    }
  }
};
