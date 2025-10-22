import { HelmetProvider } from 'react-helmet-async';
import { cleanup,fireEvent, render, screen } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import * as helpers from '@/utils/helpers';

import Quiz from './index';

// Mock i18next to handle returnObjects and namespaces
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options: any) => {
      if (key === 'questions' && options?.returnObjects) {
        return [
          {
            question: 'Question 1',
            options: ['A', 'B', 'C'],
            correctAnswer: 0,
          },
          {
            question: 'Question 2',
            options: ['D', 'E', 'F'],
            correctAnswer: 1,
          },
        ];
      }

      const translations: Record<string, string> = {
        nextQuestion: 'Next',
        restartQuiz: 'Restart Quiz',
        yourScore: 'Your Score',
        quizCompleted: 'Quiz Completed',
        bestScore: 'Best Score',
      };

      const translation = translations[key] || key;

      if (key === 'questionCounter') {
        return `Question ${options?.current} of ${options?.total}`;
      }

      return translation;
    },
  }),
}));

// Mock useBestScore hook
vi.mock('@/components/hooks/useBestScore', () => ({
  useBestScore: () => ({
    bestScore: 0,
    updateBestScore: vi.fn(),
  }),
}));

// Mock shuffle function to return the array in the same order
vi.spyOn(helpers, 'shuffle').mockImplementation((array: any[]) => array);

const renderQuiz = () => {
  return render(
    <HelmetProvider>
      <Quiz />
    </HelmetProvider>
  );
};

describe('Quiz', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render the first question', () => {
    renderQuiz();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
  });

  it('should handle a correct answer and update score', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText(/Your Score/i)).toBeInTheDocument();
  });

  it('should handle an incorrect answer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('B'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('D'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText(/Your Score/i)).toBeInTheDocument();
  });

  it('should show the result screen after the last question', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText(/Quiz Completed/i)).toBeInTheDocument();
  });

  it('should restart the quiz', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Restart Quiz'));
    expect(screen.getByText('Question 1')).toBeInTheDocument();
  });
});
