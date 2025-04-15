import { SlotState } from '../types/game';

export function calculateWinAmount(slots: SlotState, bet: number): number {
  if (slots.cambista.type === 'seal') {
    const multiplier = (slots.pule.value as number) * (slots.animal.value as any).multiplier;
    return bet * multiplier;
  } else if (slots.cambista.type === 'bankTrade') {
    return bet;
  }
  return 0;
}
