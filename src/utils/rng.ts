import { SlotSymbol } from '../types/game';

export class RNGController {
  private static readonly TARGET_RTP = 0.143; // 1/7 return rate
  private static readonly HISTORY_SIZE = 1000;
  private wins: number = 0;
  private totalSpins: number = 0;

  getCurrentRTP(): number {
    if (this.totalSpins === 0) return 0;
    return this.wins / this.totalSpins;
  }

  shouldAllowWin(): boolean {
    const currentRTP = this.getCurrentRTP();
    const baseChance = 1/7;
    
    // Dynamic adjustment based on current RTP
    let winChance = baseChance;
    if (currentRTP > this.TARGET_RTP) {
      winChance *= 0.8; // Reduce win chance if RTP is too high
    } else if (currentRTP < this.TARGET_RTP) {
      winChance *= 1.2; // Increase win chance if RTP is too low
    }

    const roll = Math.random();
    const shouldWin = roll < winChance;

    // Update statistics
    this.totalSpins++;
    if (shouldWin) this.wins++;

    // Reset history if needed
    if (this.totalSpins > this.HISTORY_SIZE) {
      this.totalSpins = Math.floor(this.totalSpins / 2);
      this.wins = Math.floor(this.wins / 2);
    }

    return shouldWin;
  }

  logStats(): void {
    console.log({
      totalSpins: this.totalSpins,
      wins: this.wins,
      currentRTP: this.getCurrentRTP(),
      targetRTP: this.TARGET_RTP
    });
  }
}