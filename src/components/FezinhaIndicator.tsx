import React from 'react';
import { Clover } from 'lucide-react';

interface FezinhaIndicatorProps {
  count: number;
  isSpecialTicketAvailable: boolean;
}

export function FezinhaIndicator({ count, isSpecialTicketAvailable }: FezinhaIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-lg">
        Fezinha: <span className="font-bold">{count}/25</span>
      </div>
      {isSpecialTicketAvailable && (
        <div className="animate-pulse">
          <Clover className="w-6 h-6 text-green-500" />
        </div>
      )}
    </div>
  );
}