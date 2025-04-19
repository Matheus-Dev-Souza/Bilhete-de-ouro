let totalSpins = 0;
let totalWins = 0;

exports.updateRTPStats = (bet, win) => {
  totalSpins += bet;
  totalWins += win;
};

exports.getCurrentRTP = () => {
  if (totalSpins === 0) return 0;
  return totalWins / totalSpins;
};