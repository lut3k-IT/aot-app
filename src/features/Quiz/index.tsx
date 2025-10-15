import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppHelmet from '@/components/ui/AppHelmet';

import Answers from './components/Answers';
import Question from './components/Question';
import QuizCard from './components/QuizCard';
import Result from './components/Result';

const Quiz = () => {
  const { t } = useTranslation(['quiz', 'common']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const translatedQuestions: any = t('questions', { ns: 'quiz', returnObjects: true });

  const handleAnswer = (answer: number) => {
    if (answer === translatedQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < translatedQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className={'flex w-full items-center justify-center pt-body-start'}>
      <AppHelmet title={t('common:title.quiz')} />
      <div className={'mt-8 w-full'}>
        <QuizCard>
          {showResult ? (
            <Result
              score={score}
              total={translatedQuestions.length}
              onRestart={handleRestart}
            />
          ) : (
            <>
              <Question question={translatedQuestions[currentQuestionIndex].question} />
              <Answers
                options={translatedQuestions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            </>
          )}
        </QuizCard>
      </div>
    </div>
  );
};

export default Quiz;