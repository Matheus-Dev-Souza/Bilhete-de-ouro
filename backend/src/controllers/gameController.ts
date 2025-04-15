// src/controllers/gameController.ts
import { Request, Response } from 'express';
import { spin } from '../services/spinService';

export async function playSlot(req: Request, res: Response) {
  const { bet, userId, gameId } = req.body;

  try {
    const result = await spin(bet, userId, gameId);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
