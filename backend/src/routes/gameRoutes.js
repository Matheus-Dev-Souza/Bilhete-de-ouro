import { Router } from 'express';
import { playSlot } from '../controllers/gameController.js';
import { partnerAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/play', partnerAuth, playSlot);

export default router;
