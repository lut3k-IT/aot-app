import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';
import { useBestScore } from '@/hooks/useBestScore';
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
  const { bestScore, updateBestScore } = useBestScore();

  const [shuffledIndices, setShuffledIndices] = useState<number[] | null>(null);

  const translatedQuestions: any[] = useMemo(
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
    if (questions[currentQuestionIndex] && answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
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
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className={'flex w-full items-center justify-center'}>
      <AppHelmet title={t('common:title.quiz')} />
      <div className={'w-full'}>
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
                question={questions[currentQuestionIndex].question}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
              <Answers
                options={questions[currentQuestionIndex].options}
                correctAnswer={questions[currentQuestionIndex].correctAnswer}
                onAnswer={handleAnswer}
                onNext={handleNextQuestion}
              />
            </>
          )}
        </QuizCard>
      </div>
    </div>
  );
};

export default Quiz;
