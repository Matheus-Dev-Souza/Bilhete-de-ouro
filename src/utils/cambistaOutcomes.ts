import { SlotSymbol } from '../types/game';

export interface CambistaResult {
  symbol: SlotSymbol;
  probability: number; // Weight for probability calculation
  message: string;
}

export const CAMBISTA_OUTCOMES: CambistaResult[] = [
  {
    symbol: { type: 'seal', value: 1 },
    probability: 15, // 15%
    message: 'Bilhete Premiado!'
  },
  {
    symbol: { type: 'loss', value: 0 },
    probability: 20, // 20%
    message: 'Não foi dessa vez'
  },
  {
    symbol: { type: 'smoke', value: 0 },
    probability: 15, // 15%
    message: 'Fumo'
  },
  {
    symbol: { type: 'freeSpin', value: 1 },
    probability: 10, // 10%
    message: 'Rodada Grátis!'
  },
  {
    symbol: { type: 'bankTrade', value: 1 },
    probability: 10, // 10%
    message: 'Trocou com a banca'
  },
  {
    symbol: { type: 'nextTime', value: 0 },
    probability: 15, // 15%
    message: 'Boa sorte na próxima!'
  },
  {
    symbol: { type: 'fezinha', value: 1 },
    probability: 15, // 15%
    message: 'Fezinha +1'
  }
];