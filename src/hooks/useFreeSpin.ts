import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface FreeSpinState {
  count: number;
  isSpecialTicketAvailable: boolean;
}

export function useFreeSpin() {
  const [state, setState] = useLocalStorage<FreeSpinState>('freeSpinState', {
    count: 0,
    isSpecialTicketAvailable: false
  });

  const addFreeSpin = () => {
    setState(prev => {
      const newCount = Math.min(prev.count + 1, 20);
      const isSpecialTicketAvailable = newCount === 20;
      
      return {
        count: newCount,
        isSpecialTicketAvailable
      };
    });
  };

  const claimSpecialTicket = () => {
    if (state.isSpecialTicketAvailable) {
      setState({
        count: 0,
        isSpecialTicketAvailable: false
      });
      return 3; // Returns 3 free spins
    }
    return 0;
  };

  return {
    freeSpinCount: state.count,
    isSpecialTicketAvailable: state.isSpecialTicketAvailable,
    addFreeSpin,
    claimSpecialTicket
  };
}