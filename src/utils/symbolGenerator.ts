import { SlotSymbol, ambistaOutcome } from '../types/game';
import { animals } from '../data/animals';
import { CAMBISTA_OUTCOMES } from './cambistaOutcomes';
import { getWeightedRandomAnimal } from './probabilityWeights';

export class SymbolGenerator {
  private forceNextWildPule = false;

  private readonly PULE_MULTIPLIERS = [
    { value: 0.25, weight: 25 },
    { value: 0.50, weight: 25 },
    { value: 1.00, weight: 20 },
    { value: 1.25, weight: 15 },
    { value: 1.50, weight: 10 },
    { value: 5.00, weight: 5 }  // Wild (Forra)
  ];

  private getRandomPuleMultiplier(): number {
    if (this.forceNextWildPule) {
      this.forceNextWildPule = false;
      return 5.00; // Wild multiplier
    }

    const totalWeight = this.PULE_MULTIPLIERS.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const multiplier of this.PULE_MULTIPLIERS) {
      random -= multiplier.weight;
      if (random <= 0) {
        return multiplier.value;
      }
    }
    return this.PULE_MULTIPLIERS[0].value;
  }

  private getRandomAnimal(): SlotSymbol {
    return {
      type: 'animal',
      value: getWeightedRandomAnimal(animals)
    };
  }

  private getCambistaOutcome(): SlotSymbol {
    const totalProbability = CAMBISTA_OUTCOMES.reduce((sum, outcome) => sum + outcome.probability, 0);
    let random = Math.random() * totalProbability;
    
    for (const outcome of CAMBISTA_OUTCOMES) {
      random -= outcome.probability;
      if (random <= 0) {
        return {
          ...outcome.symbol,
          message: outcome.message
        };
      }
    }
    return CAMBISTA_OUTCOMES[0].symbol;
  }

  generateSymbol(column: 'pule' | 'animal' | 'cambista'): SlotSymbol {
    switch (column) {
      case 'pule':
        const multiplier = this.getRandomPuleMultiplier();
        return {
          type: 'wild',
          value: multiplier,
          message: multiplier === 5 ? 'Forra!' : undefined
        };
      case 'animal':
        return this.getRandomAnimal();
      case 'cambista':
        return this.getCambistaOutcome();
      default:
        throw new Error('Invalid column');
    }
  }

  forceWildPule() {
    this.forceNextWildPule = true;
  }
}