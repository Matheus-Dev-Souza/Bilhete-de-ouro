import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import './PrizeNotification.css'; // Import the CSS

interface PrizeNotificationProps {
  prize: number;
  isVisible: boolean;
}

export function PrizeNotification({ prize, isVisible }: PrizeNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="prize-notification"
        >
          <Trophy className="prize-icon" />
          <span className="prize-amount">+ R$ {prize.toFixed(2)}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}