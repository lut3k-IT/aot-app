import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';

interface AnswersProps {
  options: string[];
  /** Kolejnosc wariantow wyliczona raz na rozgrywke w komponencie nadrzednym. */
  optionOrder: number[];
  correctAnswer: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: (answer: number) => void;
  onNext: () => void;
}

const Answers: React.FC<AnswersProps> = ({
  options,
  optionOrder,
  correctAnswer,
  selectedAnswer,
  isAnswered,
  onAnswer,
  onNext
}) => {
  const { t } = useTranslation('quiz');

  const shuffledOptions = useMemo(() => {
    const order = optionOrder.length === options.length ? optionOrder : options.map((_, index) => index);

    return order.map((shuffledIndex) => ({
      text: options[shuffledIndex],
      originalIndex: shuffledIndex
    }));
  }, [options, optionOrder]);

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
            // Klucz oparty na indeksie wariantu, a nie na jego tresci — zmiana jezyka
            // przepisuje napisy w istniejacych przyciskach zamiast wymieniac je na nowe.
            <motion.div
              key={originalIndex}
              variants={item}
            >
              <Button
                onClick={() => onAnswer(originalIndex)}
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
              onClick={onNext}
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
