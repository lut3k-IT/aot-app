import React from 'react';
import { useTranslation } from 'react-i18next';

interface QuestionProps {
  question: string;
  currentQuestion: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({ question, currentQuestion, totalQuestions }) => {
  const { t } = useTranslation('quiz');
  return (
    <>
      <div className='mb-4 text-center text-lg text-muted-foreground'>
        {t('questionCounter', { current: currentQuestion, total: totalQuestions })}
      </div>
      <h2 className='mb-6 text-center text-2xl font-bold text-card-foreground whitespace-normal'>
        {question}
      </h2>
    </>
  );
};

export default Question;