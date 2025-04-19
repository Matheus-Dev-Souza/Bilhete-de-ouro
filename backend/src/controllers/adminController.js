import { SlotPlayModel } from '../models/SlotPlay.js';

export const getFinancialReport = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao gerar relatório financeiro.', error: error.message });
  }
};
