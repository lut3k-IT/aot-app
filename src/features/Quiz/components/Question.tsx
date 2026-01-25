import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: string;
  currentQuestion: number;
  totalQuestions: number;
  answerHistory: boolean[];
}

const Question: React.FC<QuestionProps> = ({ question, currentQuestion, totalQuestions, answerHistory }) => {
  const { t } = useTranslation('quiz');
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {answerHistory.length > 0 && (
        <div className='mb-4 flex justify-center gap-2'>
          {answerHistory.map((isCorrect, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
              }`}
            >
              {isCorrect ? <Check className='h-4 w-4' /> : <X className='h-4 w-4' />}
            </motion.div>
          ))}
        </div>
      )}
      <div className='mb-4 text-center text-lg text-muted-foreground'>
        {t('questionCounter', { current: currentQuestion, total: totalQuestions })}
      </div>
      <h2 className='mb-6 flex min-h-[4rem] items-center justify-center whitespace-normal text-center text-2xl font-bold text-card-foreground'>
        {question}
      </h2>
    </motion.div>
  );
};

export default Question;
