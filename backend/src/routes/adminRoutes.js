// src/routes/adminRoutes.js
import { Router } from 'express';
import { getFinancialReport } from '../controllers/adminController.js';

const router = Router();

router.get('/financial-report', getFinancialReport);

export default router; // Alteração para exportação padrão
