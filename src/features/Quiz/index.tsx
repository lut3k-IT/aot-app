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

  const translatedQuestions: any = t('questions', { ns: 'quiz', returnObjects: true });

  const questions = useMemo(() => {
    return shuffle(translatedQuestions).slice(0, 10);
  }, [translatedQuestions]);

  useEffect(() => {
    if (isShowResult) {
      updateBestScore(score);
    }
  }, [isShowResult, score, updateBestScore]);

  const handleAnswer = (answer: number) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
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