import { Router, Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import validate from '../middlewares/validate';
import { createUserSchema, updateUserSchema, idParamSchema } from '../validators/user.validator';

const router = Router();

// GET all users
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
  })
);

// GET user by ID
router.get(
  '/:id',
  validate(idParamSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  })
);

// POST create user
router.post(
  '/',
  validate(createUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  })
);

// PUT update user
router.put(
  '/:id',
  validate(updateUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  })
);

// DELETE user
router.delete(
  '/:id',
  validate(idParamSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  })
);

export default router;