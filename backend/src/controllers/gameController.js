// src/controllers/gameController.js

import { SpinService } from '../services/spinService.js';

export const playSlot = async (req, res) => {
  try {
    const { bet, userId, gameId } = req.body;
    const result = await SpinService.executeSpin(bet, userId, gameId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
