'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { useBestScore } from '@/components/hooks/useBestScore';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobile from '@/components/hooks/useIsMobile';
import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { shuffle } from '@/utils/helpers';

import Answers from './components/Answers';
import Question from './components/Question';
import QuizCard from './components/QuizCard';
import Result from './components/Result';

const Quiz = () => {
  const { t } = useTranslation(['quiz', 'common']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredIndex, setAnsweredIndex] = useState<number | null>(null);
  const [optionOrders, setOptionOrders] = useState<number[][]>([]);
  const { bestScore, updateBestScore } = useBestScore();
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();
  const isMobileOrLandscape = useIsMobileOrLandscape();

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
      const pickedIndices = shuffle(indices).slice(0, 10);

      setShuffledIndices(pickedIndices);
      // Kolejnosc wariantow jest losowana raz na cala rozgrywke, a nie przy kazdym renderze
      // komponentu odpowiedzi — dzieki temu zmiana jezyka nie przestawia przyciskow.
      setOptionOrders(
        pickedIndices.map((questionIndex) =>
          shuffle(translatedQuestions[questionIndex].options.map((_: string, i: number) => i))
        )
      );
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
    // Druga linia obrony: nawet gdyby komponent odpowiedzi zostal odtworzony,
    // punkt za to samo pytanie nie zostanie naliczony ponownie.
    if (answeredIndex === currentQuestionIndex) return;

    const isCorrect = questions[currentQuestionIndex] && answer === questions[currentQuestionIndex].correctAnswer;

    setSelectedAnswer(answer);
    setAnsweredIndex(currentQuestionIndex);

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }
    setAnswerHistory((previous) => [...previous, isCorrect]);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;

    setSelectedAnswer(null);
    setAnsweredIndex(null);

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
    setSelectedAnswer(null);
    setAnsweredIndex(null);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames('flex w-full justify-center', {
        'pt-32': isMobile && !isLandscape,
        'pt-8': isLandscape,
        'min-h-[calc(100svh-14rem)] items-center': !isMobileOrLandscape,
        'min-h-[calc(100svh-10rem)] flex-col items-center': isMobileOrLandscape
      })}
    >
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
              key={`question-${currentQuestionIndex}`}
              question={questions[currentQuestionIndex].question}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              answerHistory={answerHistory}
            />
            <Answers
              key={`answers-${currentQuestionIndex}`}
              options={questions[currentQuestionIndex].options}
              optionOrder={optionOrders[currentQuestionIndex] || []}
              correctAnswer={questions[currentQuestionIndex].correctAnswer}
              selectedAnswer={selectedAnswer}
              isAnswered={answeredIndex === currentQuestionIndex}
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
