import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  console.log('✅ /health route hit'); // shows in server terminal
  res.setHeader('Content-Type', 'text/plain');
  res.send('✅ Health check passed');
};
