import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

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
      "relative rounded-lg overflow-hidden",
      isSpinning && "shadow-[0_0_15px_rgba(255,255,255,0.5)]",
      isWinning && "animate-flash"
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
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}