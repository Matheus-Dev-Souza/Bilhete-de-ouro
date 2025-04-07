import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Coins } from 'lucide-react';

interface WinningPopupProps {
  prize: number;
  isVisible: boolean;
  onClose: () => void;
}

export function WinningPopup({ prize, isVisible, onClose }: WinningPopupProps) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (isVisible && prize > 0) {
      // Reset counter when popup opens
      setCurrentValue(0);
      
      // Calculate increment steps
      const steps = 20; // Total steps for the animation
      const increment = prize / steps;
      const intervalTime = 100; // 100ms between each increment
      
      // Animate the counter
      const interval = setInterval(() => {
        setCurrentValue(prev => {
          const next = prev + increment;
          return next >= prize ? prize : next;
        });
      }, intervalTime);
      
      // Auto-close after 5 seconds
      const timeout = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isVisible, prize, onClose]);
  
  const getMessage = (value: number) => {
    if (value > 100) return 'FORROU O MUNDO!';
    if (value > 50) return 'FORRA SUPREMA!';
    if (value > 10) return 'FORRA!';
    return 'GANHOU!';
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />
          
          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            {/* Coins Animation */}
            {prize > 10 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      top: "-20%",
                      left: `${Math.random() * 100}%`,
                      rotate: 0,
                      opacity: 1
                    }}
                    animate={{ 
                      top: "120%",
                      rotate: 360,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 2,
                      repeat: Infinity
                    }}
                    className="absolute"
                  >
                    <Coins className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Trophy Icon */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity
                }}
              >
                <Trophy className="w-16 h-16 text-yellow-300" />
              </motion.div>
            </div>
            
            {/* Message */}
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-center text-white mb-6 text-shadow-lg"
            >
              {getMessage(prize)}
            </motion.h2>
            
            {/* Prize Amount */}
            <motion.div
              className="text-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.2)",
                  "0 0 40px rgba(255,255,255,0.4)",
                  "0 0 20px rgba(255,255,255,0.2)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <span className="text-6xl font-bold text-white">
                R$ {currentValue.toFixed(2)}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}