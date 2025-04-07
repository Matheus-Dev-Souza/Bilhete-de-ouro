export interface Animal {
  id: number;
  name: string;
  multiplier: number;
  symbol: string;
}

export type CambistaOutcome = 'seal' | 'loss' | 'smoke' | 'freeSpin' | 'bankTrade' | 'nextTime' | 'fezinha';

export interface SlotSymbol {
  type: CambistaOutcome | 'animal' | 'wild';
  value: Animal | number;
  message?: string;
}

export interface SlotState {
  pule: SlotSymbol;
  animal: SlotSymbol;
  cambista: SlotSymbol;
}

export interface GameState {
  bet: number;
  balance: number;
  isSpinning: boolean;
  freeSpins: number;
  currentWin: number;
  slots: SlotState;
  fezinhaCount: number;
}