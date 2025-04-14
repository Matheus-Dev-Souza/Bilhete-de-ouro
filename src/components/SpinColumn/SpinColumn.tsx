import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import './SpinColumn.css'; // Import the CSS

interface SpinColumnProps {
  children: React.ReactNode;
  isSpinning: boolean;
  delay: number;
  onSpinComplete?: () => void;
  isWinning?: boolean;
}

export function SpinColumn({ 
  children, 
  isSpinning, 
  delay, 
  onSpinComplete,
  isWinning 
}: SpinColumnProps) {
  return (
    <div className={cn(
      "spin-column-container",
      isSpinning && "spin-column-spinning",
      isWinning && "spin-column-winning"
    )}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isSpinning ? 'spinning' : 'static'}
          initial={{ rotateX: 0 }}
          animate={isSpinning ? { 
            rotateX: 360,
            transition: {
              duration: 1,
              delay,
              ease: "easeOut"
            }
          } : { rotateX: 0 }}
          onAnimationComplete={onSpinComplete}
          className="spin-column-content"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}