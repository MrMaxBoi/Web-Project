import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

router.get('/', healthCheck); // <--- this means it's under /api/v1/health

export default router;