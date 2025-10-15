import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {options.map((option, index) => {
          const isCorrect = index === correctAnswer;
          const isSelected = selectedAnswer === index;
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
              key={option}
              onClick={() => handleAnswer(index)}
              className="w-full justify-center"
              variant={buttonVariant as any}
              disabled={isAnswered}
            >
              {option}
            </Button>
          );
        })}
      </div>
      {isAnswered && (
        <div className="mt-4 text-center">
          <Button onClick={handleNext}>{t('nextQuestion')}</Button>
        </div>
      )}
    </div>
  );
};

export default Answers;