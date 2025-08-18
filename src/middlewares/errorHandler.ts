import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  // Mongoose validation error
  if (err?.name === 'ValidationError') {
    const details = Object.values(err.errors || {}).map((e: any) => e.message);
    return res.status(400).json({ message: 'Validation failed', errors: details });
  }

  // Bad ObjectId
  if (err?.name === 'CastError' && err?.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Duplicate key error (e.g., unique email)
  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      message: 'Duplicate key',
      fields,
    });
  }

  // Default
  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;