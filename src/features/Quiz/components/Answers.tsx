import React from 'react';

import { Button } from '@/components/ui/Button';

interface AnswersProps {
  options: string[];
  onAnswer: (answer: string) => void;
}

const Answers: React.FC<AnswersProps> = ({ options, onAnswer }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => onAnswer(option)}
          className="w-full justify-center"
          variant="outline"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default Answers;