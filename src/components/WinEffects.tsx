import React from 'react';
import { motion } from 'framer-motion';

interface WinEffectsProps {
  show: boolean;
}

export function WinEffects({ show }: WinEffectsProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: "50%",
            y: "50%",
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: [
              "50%",
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`
            ],
            y: [
              "50%",
              `${Math.random() * 100}%`,
              "120%"
            ],
            scale: [0, 1, 0],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: Math.random() * 0.2,
            repeat: Infinity
          }}
        />
      ))}
    </div>
  );
}