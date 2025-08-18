import { Request, Response } from 'express';
import User from '../models/user.model';

// @desc    Get all users
// @route   GET /api/v1/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create new user
// @route   POST /api/v1/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    if (error.code === 11000) {
      // Mongo duplicate key error (unique email)
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};