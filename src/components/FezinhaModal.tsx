import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clover, Star } from 'lucide-react';

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
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-gradient-to-b from-green-500 to-green-600 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
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
                  <Clover className="w-8 h-8 text-green-300/30" />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              {isEnding ? (
                <>
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Star className="w-16 h-16 text-yellow-300" />
                    </motion.div>
                  </div>
                  <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Modo Fezinha Concluído!
                  </h2>
                  <div className="text-center mb-6">
                    <p className="text-white/90 mb-2">Total Ganho:</p>
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold text-white"
                    >
                      R$ {totalPrize?.toFixed(2)}
                    </motion.div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Clover className="w-16 h-16 text-white" />
                    </motion.div>
                  </div>
                  <motion.h2
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-3xl font-bold text-center text-white mb-6"
                  >
                    MODO FEZINHA ATIVADO!
                  </motion.h2>
                  <div className="text-center mb-6">
                    <p className="text-white/90">
                      Prepare-se para 5 rodadas com multiplicador máximo!
                    </p>
                  </div>
                  <motion.button
                    onClick={onStart}
                    className="w-full py-3 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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