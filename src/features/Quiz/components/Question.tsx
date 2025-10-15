import React from 'react';

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <h2 className='mb-6 text-center text-2xl font-bold text-card-foreground whitespace-normal'>
      {question}
    </h2>
  );
};

export default Question;