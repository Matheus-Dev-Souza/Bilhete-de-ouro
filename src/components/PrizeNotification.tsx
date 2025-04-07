import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

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
          className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          <span className="font-medium">+ R$ {prize.toFixed(2)}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}