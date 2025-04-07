import { GameState } from '../types/game';
import { GAME_CONFIG } from './gameConfig';

export const initialState: GameState = {
  bet: GAME_CONFIG.MIN_BET,
  balance: GAME_CONFIG.INITIAL_BALANCE,
  isSpinning: false,
  freeSpins: 0,
  currentWin: 0,
  fezinhaCount: 0,
  slots: {
    pule: { type: 'wild', value: 1 },
    animal: { type: 'animal', value: { id: 1, name: 'Avestruz', multiplier: 1, symbol: '🦅' } },
    cambista: { type: 'loss', value: 0, message: 'Aguardando jogada...' },
  },
};