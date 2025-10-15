import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';

interface ResultProps {
  score: number;
  total: number;
  bestScore: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, bestScore, onRestart }) => {
  const { t } = useTranslation('quiz');

  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-bold text-card-foreground">
        {t('quizCompleted')}
      </h2>
      <p className="mb-6 text-lg text-muted-foreground">
        {t('yourScore')}: {score} / {total}
      </p>
      <p className="mb-6 text-lg text-muted-foreground">
        {t('bestScore')}: {bestScore} / {total}
      </p>
      <Button onClick={onRestart}>{t('restartQuiz')}</Button>
    </div>
  );
};

export default Result;