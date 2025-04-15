// src/routes/gameRoutes.ts
import { Router } from 'express';
import { playSlot } from '../controllers/gameController';

export const gameRouter = Router();

gameRouter.post('/play', playSlot); // POST /api/game/play
