// src/utils/winCalculator.js

export const calculateWin = (symbols, bet) => {
  // Verificar se o cambista existe e tem o tipo 'seal'
  if (symbols.cambista && symbols.cambista.type === 'seal') {
    // Validar pule.value como número
    const puleValue = typeof symbols.pule?.value === 'number' 
      ? symbols.pule.value 
      : 0;

    // Validar animal.value como objeto Animal
    const animalValue = symbols.animal?.value || {};
    const animalMultiplier = typeof animalValue.multiplier === 'number'
      ? animalValue.multiplier
      : 0;

    return bet * puleValue * animalMultiplier;
  }
  
  // Verificar se o cambista existe e tem o tipo 'bankTrade'
  if (symbols.cambista && symbols.cambista.type === 'bankTrade') {
    return bet;
  }

  // Caso não encontre nenhuma condição válida
  return 0;
};
