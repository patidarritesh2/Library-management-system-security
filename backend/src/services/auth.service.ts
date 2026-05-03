
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';
import { User, UserPublic, JwtPayload } from '../models/types';

export const registerUser = async (
  username: string,
  password: string,
  role: 'admin' | 'user' = 'user'
): Promise<UserPublic> => {

  const [existing] = await pool.execute(
    'SELECT id FROM users WHERE username = ?',
    [username]
  ) as any[];

  if (existing.length > 0) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const id = uuidv4();

  await pool.execute(
    'INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
    [id, username, hashedPassword, role]
  );

  return { id, username, role };
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string; user: UserPublic }> => {

  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  ) as any[];

  const user: User | undefined = rows[0];

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
    role: user.role
  };

  const secret = process.env.JWT_SECRET || 'fallback_secret';
  const token = jwt.sign(payload, secret, {
    expiresIn: '24h'
  });

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role }
  };
};
