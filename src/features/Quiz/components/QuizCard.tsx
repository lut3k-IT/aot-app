import React from 'react';
import { motion } from 'framer-motion';

interface QuizCardProps {
  children: React.ReactNode;
}

const QuizCard: React.FC<QuizCardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='m-auto w-full max-w-2xl'
    >
      {children}
    </motion.div>
  );
};

export default QuizCard;
