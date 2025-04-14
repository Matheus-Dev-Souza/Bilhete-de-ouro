import React, { useState } from 'react';
import { Infinity, StopCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AutoSpinControls.module.css';

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
      <div className={styles.container}>
        <motion.button
          onClick={onStop}
          className={`${styles.button} ${styles.buttonStop}`}
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
    <div className={styles.relativeZ}>
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.button} ${styles.buttonAutoSpin}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Infinity className="w-5 h-5" />
        <span className="font-medium">Auto Spin</span>
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.overlay}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.menu}
            >
              <div className="flex flex-col gap-2">
                {spinOptions.map(spins => (
                  <motion.button
                    key={spins}
                    onClick={() => handleOptionSelect(spins)}
                    className={styles.optionButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{spins} Rodadas</span>
                    <Play className="w-4 h-4 text-yellow-600" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
