import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clover, Star } from 'lucide-react';
import './FezinhaModal.css';

interface FezinhaModalProps {
  isVisible: boolean;
  onStart: () => void;
  totalPrize?: number;
  isEnding?: boolean;
}

export function FezinhaModal({ isVisible, onStart, totalPrize, isEnding }: FezinhaModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fezinha-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="fezinha-modal-container"
          >
            {/* Background Animation */}
            <div className="fezinha-bg-animation">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="fezinha-bg-element"
                  initial={{ 
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    scale: 0
                  }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  <Clover className="fezinha-bg-icon" />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="fezinha-content">
              {isEnding ? (
                <>
                  <div className="fezinha-header-icon-container">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Star className="fezinha-header-icon text-yellow-300" />
                    </motion.div>
                  </div>
                  <h2 className="fezinha-title">
                    Modo Fezinha Concluído!
                  </h2>
                  <div className="fezinha-prize-container">
                    <p className="fezinha-text">Total Ganho:</p>
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="fezinha-prize-value"
                    >
                      R$ {totalPrize?.toFixed(2)}
                    </motion.div>
                  </div>
                </>
              ) : (
                <>
                  <div className="fezinha-header-icon-container">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Clover className="fezinha-header-icon" />
                    </motion.div>
                  </div>
                  <motion.h2
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="fezinha-title"
                  >
                    MODO FEZINHA ATIVADO!
                  </motion.h2>
                  <div className="fezinha-text-container">
                    <p className="fezinha-text">
                      Prepare-se para 5 rodadas com multiplicador máximo!
                    </p>
                  </div>
                  <motion.button
                    onClick={onStart}
                    className="fezinha-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apostar
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}