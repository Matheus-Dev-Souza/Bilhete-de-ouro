// src/services/spinService.ts
import { calculateWinAmount } from '../utils/winCalculator';
import { generateSlotSymbols } from '../utils/symbolGenerator';
import { updateRTPStats } from './rtpService';

export async function spin(bet: number, userId: string, gameId: string) {
  // Validação simplificada
  if (bet <= 0) throw new Error('Aposta inválida');

  const slots = generateSlotSymbols();
  const win = calculateWinAmount(slots, bet);

  // Atualiza estatísticas de RTP
  updateRTPStats(bet, win);

  return {
    success: true,
    slots,
    win,
    ggr: bet - win,
  };
}
