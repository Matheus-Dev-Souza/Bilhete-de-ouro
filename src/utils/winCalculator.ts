import { SlotState } from '../types/game';

export function calculateWinAmount(slots: SlotState, bet: number): number {
  const cambistaType = slots.cambista.type;
  
  switch (cambistaType) {
    case 'seal':
      if (slots.animal.type === 'animal') {
        const multiplier = (slots.pule.value as number) * (slots.animal.value as any).multiplier;
        return bet * multiplier;
      }
      break;
    case 'bankTrade':
      return bet;
    default:
      return 0;
  }
  return 0;
}