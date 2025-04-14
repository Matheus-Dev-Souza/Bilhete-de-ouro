import React from 'react';
import { Stamp, Cigarette, RefreshCcw, Banknote, Star, Clover } from 'lucide-react';
import { SlotSymbol } from '../../types/game';
import './CambistaSymbol.css'; 

interface CambistaSymbolProps {
  symbol: SlotSymbol;
}

export function CambistaSymbol({ symbol }: CambistaSymbolProps) {
  switch (symbol.type) {
    case 'seal':
      return <Stamp className="cambista-icon seal" />;
    case 'smoke':
      return <Cigarette className="cambista-icon smoke" />;
    case 'freeSpin':
      return <RefreshCcw className="cambista-icon freeSpin" />;
    case 'bankTrade':
      return <Banknote className="cambista-icon bankTrade" />;
    case 'nextTime':
      return <Star className="cambista-icon nextTime" />;
    case 'fezinha':
      return <Clover className="cambista-icon fezinha" />;
    case 'loss':
      return <span className="cambista-icon loss">+0</span>;
    default:
      return null;
  }
}