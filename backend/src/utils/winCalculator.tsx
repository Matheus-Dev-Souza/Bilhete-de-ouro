import { SlotState } from '../types/game';

export function calculateWinAmount(slots: SlotState, bet: number): number {
  // Verificar se o cambista é 'seal'
  if (slots.cambista.type === 'seal') {
    // Garantir que slots.pule.value é um número
    const puleValue = typeof slots.pule.value === 'number' ? slots.pule.value : 0;
    
    // Garantir que slots.animal.value seja um objeto Animal
    const animalMultiplier = (slots.animal.value as Animal).multiplier;

    // Calcular o valor do ganho multiplicado pela aposta
    return bet * puleValue * animalMultiplier;
  }
  
  // Caso o cambista seja 'bankTrade', o ganho é igual à aposta
  else if (slots.cambista.type === 'bankTrade') {
    return bet;
  }

  // Caso não seja nenhum dos casos acima, retorna 0 (sem ganho)
  return 0;
}
