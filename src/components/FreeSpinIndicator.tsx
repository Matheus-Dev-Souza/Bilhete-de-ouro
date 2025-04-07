import React from 'react';
import { Gift } from 'lucide-react';

interface FreeSpinIndicatorProps {
  count: number;
  isSpecialTicketAvailable: boolean;
}

export function FreeSpinIndicator({ count, isSpecialTicketAvailable }: FreeSpinIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-lg">
        Rodadas Grátis: <span className="font-bold">{count}/20</span>
      </div>
      {isSpecialTicketAvailable && (
        <div className="animate-pulse">
          <Gift className="w-6 h-6 text-yellow-500" />
        </div>
      )}
    </div>
  );
}