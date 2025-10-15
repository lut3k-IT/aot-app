import React from 'react';

interface QuizCardProps {
  children: React.ReactNode;
}

const QuizCard: React.FC<QuizCardProps> = ({ children }) => {
  return (
    <div className="w-full max-w-2xl rounded-lg bg-card p-8 m-auto">
      {children}
    </div>
  );
};

export default QuizCard;