'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useBestScore } from '@/components/hooks/useBestScore';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { shuffle } from '@/utils/helpers';

import Answers from './components/Answers';
import Question from './components/Question';
import QuizCard from './components/QuizCard';
import Result from './components/Result';

const Quiz = () => {
  const { t, i18n } = useTranslation(['quiz', 'common']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const { bestScore, updateBestScore } = useBestScore();

  const [shuffledIndices, setShuffledIndices] = useState<number[] | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translatedQuestions: any[] = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (t('questions', { ns: 'quiz', returnObjects: true }) as any[]) || [],
    [t]
  );

  useEffect(() => {
    if (translatedQuestions.length > 0 && shuffledIndices === null) {
      const indices = Array.from({ length: translatedQuestions.length }, (_, i) => i);
      setShuffledIndices(shuffle(indices).slice(0, 10));
    }
  }, [translatedQuestions, shuffledIndices]);

  const questions = useMemo(() => {
    if (!shuffledIndices) {
      return [];
    }
    return shuffledIndices.map((index) => translatedQuestions[index]);
  }, [translatedQuestions, shuffledIndices]);

  useEffect(() => {
    if (isShowResult) {
      updateBestScore(score);
    }
  }, [isShowResult, score, updateBestScore]);

  const handleAnswer = (answer: number) => {
    const isCorrect = questions[currentQuestionIndex] && answer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswerHistory([...answerHistory, isCorrect]);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setIsShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsShowResult(false);
    setAnswerHistory([]);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className={'flex min-h-[70vh] w-full items-center justify-center py-8'}>
      <DynamicTitle title={t('common:title.quiz')} />
      <QuizCard>
        {isShowResult ? (
          <Result
            score={score}
            total={questions.length}
            bestScore={bestScore}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <Question
              key={`question-${currentQuestionIndex}-${i18n.language}`}
              question={questions[currentQuestionIndex].question}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              answerHistory={answerHistory}
            />
            <Answers
              key={`answers-${currentQuestionIndex}-${i18n.language}`}
              options={questions[currentQuestionIndex].options}
              correctAnswer={questions[currentQuestionIndex].correctAnswer}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
            />
          </>
        )}
      </QuizCard>
    </div>
  );
};

export default Quiz;
