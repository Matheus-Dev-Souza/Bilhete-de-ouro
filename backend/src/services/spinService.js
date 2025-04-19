// src/services/spinService.js

import { SlotPlayModel } from '../models/SlotPlay.js';
import { GAME_CONFIG, FINANCIAL } from '../config/constants.js';
import { calculateWin } from '../utils/winCalculator.js';
import { generateSymbols } from '../utils/symbolGenerator.js';

class SpinService {
  static async executeSpin(bet, externalUserId, partnerId) {
    const symbols = generateSymbols();
    const baseWin = calculateWin(symbols, bet);
    const dynamicRTP = this.calculateDynamicRTP();
    
    const actualWin = Math.floor(baseWin * dynamicRTP);
    const ggr = (bet - actualWin) * FINANCIAL.GGR_PERCENTAGE;

    const play = new SlotPlayModel({
      externalUserId,
      partnerId,
      betAmount: bet,
      winAmount: actualWin,
      RTP: dynamicRTP,
      GGR: ggr,
      symbols
    });
    
    await play.save();

    return {
      symbols,
      win: actualWin,
      balance: await this.updateUserBalance(externalUserId, bet, actualWin),
      rtp: dynamicRTP,
      ggr
    };
  }

  static calculateDynamicRTP() {
    return GAME_CONFIG.BASE_RTP + 
      (Math.random() * GAME_CONFIG.VOLATILITY * 2 - GAME_CONFIG.VOLATILITY);
  }

  static async updateUserBalance(userId, bet, win) {
    return 1000 - bet + win; // Mocked balance update
  }
}

export { SpinService };
