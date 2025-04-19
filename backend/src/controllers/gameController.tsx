// src/controllers/gameController.ts
import { Request, Response } from 'express';
import { SpinService } from '../services/spinService';
import { spinSchema } from '../validators/game.validator';

export const playSlot = async (req: Request, res: Response) => {
  const { error } = spinSchema.validate(req.body);
  if (error) throw new Error(`ValidationError: ${error.message}`);

  const { bet, externalUserId, partnerId } = req.body;
  
  try {
    const result = await SpinService.executeSpin(bet, externalUserId, partnerId);
    res.json({ success: true, ...result });
  } catch (err) {
    throw new Error(`SpinError: ${err.message}`);
  }
};
