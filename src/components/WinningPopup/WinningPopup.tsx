import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Coins } from 'lucide-react';
import './WinningPopup.css';

interface WinningPopupProps {
  prize: number;
  isVisible: boolean;
  onClose: () => void;
}

export function WinningPopup({ prize, isVisible, onClose }: WinningPopupProps) {
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (isVisible && prize > 0) {
      setCurrentValue(0);
      const steps = 20;
      const increment = prize / steps;
      const intervalTime = 100;
      
      const interval = setInterval(() => {
        setCurrentValue(prev => {
          const next = prev + increment;
          return next >= prize ? prize : next;
        });
      }, intervalTime);
      
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
          className="winning-popup-overlay"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="winning-popup-backdrop"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="winning-popup-content"
          >
            {prize > 10 && (
              <div className="winning-coins-container">
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
                    className="winning-coin"
                  >
                    <Coins className="w-8 h-8" />
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="winning-trophy-container">
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
                <Trophy className="winning-trophy" />
              </motion.div>
            </div>
            
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="winning-message"
            >
              {getMessage(prize)}
            </motion.h2>
            
            <motion.div
              className="winning-prize-container"
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
              <span className="winning-prize-amount">
                R$ {currentValue.toFixed(2)}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}