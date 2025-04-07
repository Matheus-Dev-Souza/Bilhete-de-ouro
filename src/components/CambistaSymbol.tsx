import React from 'react';
import { Stamp, Cigarette, RefreshCcw, Banknote, Star, Clover } from 'lucide-react';
import { SlotSymbol } from '../types/game';

interface CambistaSymbolProps {
  symbol: SlotSymbol;
}

export function CambistaSymbol({ symbol }: CambistaSymbolProps) {
  switch (symbol.type) {
    case 'seal':
      return <Stamp className="w-8 h-8 mx-auto text-green-600" />;
    case 'smoke':
      return <Cigarette className="w-8 h-8 mx-auto text-gray-600" />;
    case 'freeSpin':
      return <RefreshCcw className="w-8 h-8 mx-auto text-blue-600" />;
    case 'bankTrade':
      return <Banknote className="w-8 h-8 mx-auto text-yellow-600" />;
    case 'nextTime':
      return <Star className="w-8 h-8 mx-auto text-purple-600" />;
    case 'fezinha':
      return <Clover className="w-8 h-8 mx-auto text-green-400" />;
    case 'loss':
      return <span className="text-red-600">+0</span>;
    default:
      return null;
  }
}