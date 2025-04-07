import { Animal } from '../types/game';

// Calculate weight based on multiplier - higher multiplier means lower probability
export function calculateWeight(multiplier: number): number {
  // Base weight calculation: inverse relationship with multiplier
  // Using exponential decay to make higher multipliers much rarer
  return Math.exp(-0.1 * multiplier);
}

// Get weighted random index for animal selection
export function getWeightedRandomIndex(weights: number[]): number {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i;
    }
  }
  return weights.length - 1;
}

// Get weighted random animal from the list
export function getWeightedRandomAnimal(animals: Animal[]): Animal {
  const weights = animals.map(animal => calculateWeight(animal.multiplier));
  const selectedIndex = getWeightedRandomIndex(weights);
  return animals[selectedIndex];
}