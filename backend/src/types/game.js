// src/types/gameTypes.js

/**
 * @typedef {Object} Animal
 * @property {number} id
 * @property {string} name
 * @property {number} multiplier
 * @property {string} symbol
 */

/**
 * @typedef {'seal' | 'loss' | 'smoke' | 'freeSpin' | 'bankTrade' | 'nextTime' | 'fezinha'} CambistaOutcome
 */

/**
 * @typedef {Object} SlotSymbol
 * @property {CambistaOutcome | 'animal' | 'wild'} type
 * @property {Animal | number} value
 * @property {string} [message]
 */

/**
 * @typedef {Object} SlotState
 * @property {SlotSymbol} pule
 * @property {SlotSymbol} animal
 * @property {SlotSymbol} cambista
 */

/**
 * @typedef {Object} GameState
 * @property {number} bet
 * @property {number} balance
 * @property {boolean} isSpinning
 * @property {number} freeSpins
 * @property {number} currentWin
 * @property {SlotState} slots
 * @property {number} fezinhaCount
 */

// Exemplo de uso:
/** @type {GameState} */
const gameState = {
  bet: 10,
  balance: 1000,
  isSpinning: false,
  freeSpins: 0,
  currentWin: 0,
  slots: {
    pule: { type: 'wild', value: 2 },
    animal: { type: 'animal', value: { id: 1, name: 'Tigre', multiplier: 5, symbol: '🐅' } },
    cambista: { type: 'seal', value: 3 }
  },
  fezinhaCount: 0
};