import { useState, useCallback } from 'react';

export function useAutoSpin() {
  const [autoSpinCount, setAutoSpinCount] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  const startAutoSpin = useCallback((spins: number) => {
    setAutoSpinCount(spins);
    setIsAutoSpinning(true);
  }, []);

  const stopAutoSpin = useCallback(() => {
    setAutoSpinCount(0);
    setIsAutoSpinning(false);
  }, []);

  const decrementAutoSpin = useCallback(() => {
    setAutoSpinCount(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsAutoSpinning(false);
        return 0;
      }
      return newCount;
    });
  }, []);

  return {
    autoSpinCount,
    isAutoSpinning,
    startAutoSpin,
    stopAutoSpin,
    decrementAutoSpin
  };
}