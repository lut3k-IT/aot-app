export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'This is a sample question 1?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctAnswer: 0
  },
  {
    question: 'This is a sample question 2?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctAnswer: 1
  },
  {
    question: 'This is a sample question 3?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctAnswer: 2
  }
];