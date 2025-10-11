import React from 'react';

import { Button } from '@/components/ui/Button';

interface ResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, onRestart }) => {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-bold text-card-foreground">
        Quiz Completed!
      </h2>
      <p className="mb-6 text-lg text-muted-foreground">
        Your score: {score} / {total}
      </p>
      <Button onClick={onRestart}>Restart Quiz</Button>
    </div>
  );
};

export default Result;