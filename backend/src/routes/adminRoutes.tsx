// src/routes/adminRoutes.ts
import { Router } from 'express';
import { getFinancialReport } from '../controllers/adminController';

const router = Router();

router.get('/financial-report', getFinancialReport);

export { router as adminRoutes };