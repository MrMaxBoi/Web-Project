import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import healthRoutes from './routes/health.routes';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/health', healthRoutes);

app.use((req, res, next) => {
  console.log(`🚨 Unmatched request: ${req.method} ${req.url}`);
  next();
});

app.get('/__debug', (req, res) => {
  res.send('🟢 Debug route working');
});

app.use(notFound);
app.use(errorHandler);

export default app;