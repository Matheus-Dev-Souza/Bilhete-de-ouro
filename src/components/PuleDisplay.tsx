import React from 'react';
import { Flame } from 'lucide-react';
import { SlotSymbol } from '../types/game';

interface PuleDisplayProps {
  symbol: SlotSymbol;
}

export function PuleDisplay({ symbol }: PuleDisplayProps) {
  if (symbol.type !== 'wild') return null;

  const multiplier = symbol.value as number;
  const isForra = multiplier === 5;

  return (
    <div className="flex items-center justify-center gap-2">
      {isForra ? (
        <>
          <Flame className="w-8 h-8 text-red-500 animate-pulse" />
          <span className="text-2xl font-bold text-red-500">Forra!</span>
        </>
      ) : (
        <span className="text-4xl">{multiplier}x</span>
      )}
    </div>
  );
}