import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require('./docs/swagger.json');

import healthRoutes from './routes/health.routes';
import userRoutes from './routes/users.routes';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

// ✅ Helmet with CSP disabled (Swagger UI needs this)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ✅ Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// ✅ Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/users', userRoutes);

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