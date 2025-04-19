let totalSpins = 0;
let totalWins = 0;

export function updateRTPStats(bet: number, win: number) {
  totalSpins += bet;
  totalWins += win;
}

export function getCurrentRTP() {
  if (totalSpins === 0) return 0;
  return totalWins / totalSpins;
}
