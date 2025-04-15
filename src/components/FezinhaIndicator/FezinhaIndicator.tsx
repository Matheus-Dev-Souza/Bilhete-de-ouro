import React from 'react';
import { Clover } from 'lucide-react';
import './FezinhaIndicator.css';

interface FezinhaIndicatorProps {
  count: number;
  isSpecialTicketAvailable: boolean;
}

export function FezinhaIndicator({ count, isSpecialTicketAvailable }: FezinhaIndicatorProps) {
  return (
    <div className="fezinha-container">
    {/*  <div className="fezinha-text">
        Fezinha: <span className="fezinha-count">{count}/25</span>
      </div> */} 
      {isSpecialTicketAvailable && (
        <div className="fezinha-icon-container">
          <Clover className="fezinha-icon" />
        </div>
      )}
    </div>
  );
}