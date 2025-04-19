// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { SlotPlayModel } from '../models/SlotPlay';

export const getFinancialReport = async (req: Request, res: Response) => {
  const report = await SlotPlayModel.aggregate([
    {
      $group: {
        _id: "$partnerId",
        totalBet: { $sum: "$betAmount" },
        totalWin: { $sum: "$winAmount" },
        totalGGR: { $sum: "$GGR" }
      }
    }
  ]);
  
  res.json({ success: true, report });
};