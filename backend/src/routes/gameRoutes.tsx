// src/routes/gameRoutes.ts
import { Router } from 'express';
import { playSlot } from '../controllers/gameController';
import { partnerAuth } from '../middlewares/auth';

const router = Router();

router.post('/play', partnerAuth, playSlot);

export default router;

