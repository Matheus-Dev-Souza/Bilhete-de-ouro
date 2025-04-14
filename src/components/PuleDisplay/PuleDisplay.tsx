import React from 'react';
import { Flame } from 'lucide-react';
import { SlotSymbol } from '../types/game';
import './PuleDisplay.css'; 

interface PuleDisplayProps {
  symbol: SlotSymbol;
}

export function PuleDisplay({ symbol }: PuleDisplayProps) {
  if (symbol.type !== 'wild') return null;

  const multiplier = symbol.value as number;
  const isForra = multiplier === 5;

  return (
    <div className="pule-display-container">
      {isForra ? (
        <>
          <Flame className="pule-flame-icon" />
          <span className="pule-forra-text">Forra!</span>
        </>
      ) : (
        <span className="pule-multiplier">{multiplier}x</span>
      )}
    </div>
  );
}