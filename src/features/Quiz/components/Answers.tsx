import React, { useMemo } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  const shuffledOptions = useMemo(() => {
    const originalIndices = options.map((_, index) => index);
    const shuffledIndices = shuffle(originalIndices);
    return shuffledIndices.map((shuffledIndex) => ({
      text: options[shuffledIndex],
      originalIndex: shuffledIndex
    }));
  }, [options]);

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

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {shuffledOptions.map(({ text, originalIndex }) => {
          const isCorrect = originalIndex === correctAnswer;
          const isSelected = selectedAnswer === originalIndex;
          let buttonVariant = 'outline';
          if (isAnswered) {
            if (isCorrect) {
              buttonVariant = 'success-outline';
            } else if (isSelected) {
              buttonVariant = 'destructive-outline';
            }
          }

          return (
            <Button
              key={text}
              onClick={() => handleAnswer(originalIndex)}
              className='w-full justify-center h-auto'
              variant={buttonVariant as 'default'}
              disabled={isAnswered}
            >
              {text}
            </Button>
          );
        })}
      </div>
      {isAnswered && (
        <div className='mt-4 text-center'>
          <Button onClick={handleNext}>{t('nextQuestion')}</Button>
        </div>
      )}
    </div>
  );
};

export default Answers;