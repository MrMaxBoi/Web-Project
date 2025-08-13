import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction // renamed to avoid ESLint error
) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;