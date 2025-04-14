import React from 'react';
import { Gift } from 'lucide-react';
import './FreeSpinIndicator.css'; 

interface FreeSpinIndicatorProps {
  count: number;
  isSpecialTicketAvailable: boolean;
}

export function FreeSpinIndicator({ count, isSpecialTicketAvailable }: FreeSpinIndicatorProps) {
  return (
    <div className="free-spin-container">
      <div className="free-spin-text">
        Rodadas Grátis: <span className="free-spin-count">{count}/20</span>
      </div>
      {isSpecialTicketAvailable && (
        <div className="free-spin-icon-container">
          <Gift className="free-spin-icon" />
        </div>
      )}
    </div>
  );
}