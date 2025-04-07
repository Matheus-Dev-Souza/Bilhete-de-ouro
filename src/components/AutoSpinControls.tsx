import React, { useState } from 'react';
import { Infinity, StopCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoSpinControlsProps {
  isAutoSpinning: boolean;
  remainingSpins: number;
  onAutoSpin: (spins: number) => void;
  onStop: () => void;
}

export function AutoSpinControls({
  isAutoSpinning,
  remainingSpins,
  onAutoSpin,
  onStop
}: AutoSpinControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const spinOptions = [5, 10, 20, 100];

  const handleOptionSelect = (spins: number) => {
    setIsMenuOpen(false);
    onAutoSpin(spins);
  };

  if (isAutoSpinning) {
    return (
      <div className="mt-4">
        <motion.button
          onClick={onStop}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <StopCircle className="w-5 h-5" />
          <span className="font-medium">Parar ({remainingSpins})</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="relative mt-4">
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Infinity className="w-5 h-5" />
        <span className="font-medium">Auto Spin</span>
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-white rounded-lg shadow-xl p-2 min-w-[200px]"
          >
            <div className="flex flex-col gap-2">
              {spinOptions.map(spins => (
                <motion.button
                  key={spins}
                  onClick={() => handleOptionSelect(spins)}
                  className="flex items-center justify-between px-4 py-2 hover:bg-yellow-50 rounded-md transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{spins} Rodadas</span>
                  <Play className="w-4 h-4 text-yellow-600" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setIsMenuOpen(false)}
          style={{ zIndex: -1 }}
        />
      )}
    </div>
  );
}