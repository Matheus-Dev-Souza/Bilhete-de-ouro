import { useLocalStorage } from './useLocalStorage';

interface FezinhaState {
  count: number;
  isSpecialTicketAvailable: boolean;
  isActive: boolean;
  remainingSpins: number;
  totalPrize: number;
}

export function useFezinha() {
  const [state, setState] = useLocalStorage<FezinhaState>('fezinhaState', {
    count: 0,
    isSpecialTicketAvailable: false,
    isActive: false,
    remainingSpins: 0,
    totalPrize: 0
  });

  const addFezinha = () => {
    if (!state.isActive) {
      setState(prev => {
        const newCount = Math.min(prev.count + 1, 25);
        const isSpecialTicketAvailable = newCount === 25;
        
        return {
          ...prev,
          count: newCount,
          isSpecialTicketAvailable
        };
      });
    }
  };

  const startFezinhaMode = () => {
    setState(prev => ({
      ...prev,
      isActive: true,
      remainingSpins: 5,
      totalPrize: 0,
      count: 0,
      isSpecialTicketAvailable: false
    }));
  };

  const addFezinhaPrize = (prize: number) => {
    if (state.isActive) {
      setState(prev => ({
        ...prev,
        totalPrize: prev.totalPrize + prize,
        remainingSpins: prev.remainingSpins - 1,
        isActive: prev.remainingSpins > 1
      }));
    }
  };

  const resetFezinha = () => {
    setState(prev => ({
      ...prev,
      isActive: false,
      remainingSpins: 0,
      totalPrize: 0
    }));
  };

  return {
    fezinhaCount: state.count,
    isSpecialTicketAvailable: state.isSpecialTicketAvailable,
    isActive: state.isActive,
    remainingSpins: state.remainingSpins,
    totalPrize: state.totalPrize,
    addFezinha,
    startFezinhaMode,
    addFezinhaPrize,
    resetFezinha
  };
}