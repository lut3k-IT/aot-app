import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';
import { shuffle } from '@/utils/helpers';

interface AnswersProps {
  options: string[];
  correctAnswer: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
}

const Answers: React.FC<AnswersProps> = ({ options, correctAnswer, onAnswer, onNext }) => {
  const { t } = useTranslation('quiz');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize immediately to ensure staggered animation works with present children
  const [shuffledIndices] = useState<number[]>(() => {
    const originalIndices = options.map((_, index) => index);
    return shuffle(originalIndices);
  });

  const shuffledOptions = useMemo(() => {
    return shuffledIndices.map((shuffledIndex) => ({
      text: options[shuffledIndex],
      originalIndex: shuffledIndex
    }));
  }, [options, shuffledIndices]);

  const handleAnswer = (answer: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswer(answer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    onNext();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div>
      <motion.div
        className={'grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'}
        variants={container}
        initial='hidden'
        animate='show'
      >
        {shuffledOptions.map(({ text, originalIndex }) => {
          const isCorrect = originalIndex === correctAnswer;
          const isSelected = selectedAnswer === originalIndex;

          let buttonVariant: 'outline' | 'success' | 'destructive' | 'secondary' | 'default' = 'outline';
          let extraClasses = 'border-2 border-border text-foreground';

          if (isAnswered) {
            if (isCorrect) {
              buttonVariant = 'success';
              extraClasses = 'border-2 border-transparent text-white';
            } else if (isSelected) {
              buttonVariant = 'destructive';
              extraClasses = 'border-2 border-transparent text-white';
            } else {
              extraClasses = 'border-2 border-border text-muted-foreground opacity-50';
            }
          }

          return (
            <motion.div
              key={text}
              variants={item}
            >
              <Button
                onClick={() => handleAnswer(originalIndex)}
                className={`h-auto min-h-12 w-full justify-center px-6 text-lg font-semibold transition-all duration-200 md:min-h-16 ${extraClasses}`}
                variant={buttonVariant}
                disabled={isAnswered}
              >
                {text}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
      <div className='mt-4 flex min-h-[4rem] items-center justify-center md:mt-8'>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleNext}
              size='lg'
              className='px-12 font-bold'
            >
              {t('nextQuestion')}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Answers;
