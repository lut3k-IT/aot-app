import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, RotateCcw, Target, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/Button';

interface ResultProps {
  score: number;
  total: number;
  bestScore: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, bestScore, onRestart }) => {
  const { t } = useTranslation('quiz');
  const percentage = Math.round((score / total) * 100);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const intervalTime = duration / steps;
    const percentageStep = percentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += percentageStep;
      if (current >= percentage) {
        setDisplayedPercentage(percentage);
        clearInterval(timer);
      } else {
        setDisplayedPercentage(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [percentage]);

  let evaluationKey = 'evaluation.tryAgain';
  let circleColor = 'from-red-500 to-red-600';
  let bgGradient = 'from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20';
  let textColor = 'text-red-600 dark:text-red-500';

  if (percentage >= 100) {
    evaluationKey = 'evaluation.perfect';
    circleColor = 'from-green-500 to-emerald-600';
    bgGradient = 'from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-900/20';
    textColor = 'text-emerald-600 dark:text-emerald-500';
  } else if (percentage >= 80) {
    evaluationKey = 'evaluation.excellent';
    circleColor = 'from-green-500 to-green-600';
    bgGradient = 'from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20';
    textColor = 'text-green-600 dark:text-green-500';
  } else if (percentage >= 50) {
    evaluationKey = 'evaluation.good';
    circleColor = 'from-yellow-500 to-orange-500';
    bgGradient = 'from-yellow-50 to-orange-100 dark:from-yellow-950/20 dark:to-orange-900/20';
    textColor = 'text-orange-600 dark:text-orange-500';
  }

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (displayedPercentage / 100) * circumference;

  return (
    <motion.div
      className='flex flex-col items-center justify-center space-y-8'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className='text-4xl font-bold text-foreground'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('quizCompleted')}
      </motion.h2>

      <motion.div
        className='relative'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <svg className='h-48 w-48 -rotate-90 transform'>
          <circle
            cx='96'
            cy='96'
            r='70'
            stroke='currentColor'
            strokeWidth='8'
            fill='none'
            className='text-muted/20'
          />
          <motion.circle
            cx='96'
            cy='96'
            r='70'
            stroke='url(#gradient)'
            strokeWidth='8'
            fill='none'
            strokeLinecap='round'
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient
              id='gradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop
                offset='0%'
                className={`${circleColor.split(' ')[0].replace('from-', 'stop-')}`}
              />
              <stop
                offset='100%'
                className={`${circleColor.split(' ')[1].replace('to-', 'stop-')}`}
              />
            </linearGradient>
          </defs>
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-5xl font-bold text-foreground'>{displayedPercentage}%</span>
          <span className='text-sm text-muted-foreground'>
            {score} / {total}
          </span>
        </div>
      </motion.div>

      <motion.p
        className={`text-2xl font-semibold ${textColor}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {t(evaluationKey, { defaultValue: percentage >= 50 ? 'Good job!' : 'Try again!' })}
      </motion.p>

      <div className='grid w-full max-w-md grid-cols-2 gap-4'>
        <motion.div
          className='rounded-xl bg-muted/50 p-4 shadow-sm'
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Target className='h-4 w-4' />
            {t('yourScore')}
          </div>
          <div className='mt-2 text-2xl font-bold text-foreground'>
            {score} / {total}
          </div>
        </motion.div>

        <motion.div
          className='rounded-xl bg-muted/50 p-4 shadow-sm'
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
            <Award className='h-4 w-4' />
            {t('bestScore')}
          </div>
          <div className='mt-2 flex items-center gap-2'>
            <div className='text-2xl font-bold text-foreground'>
              {bestScore} / {total}
            </div>
            {score > bestScore && <TrendingUp className='h-4 w-4 text-green-500' />}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Button
          onClick={onRestart}
          size='lg'
          className='px-8 font-bold shadow-lg transition-all hover:scale-105 active:scale-95'
        >
          <RotateCcw className='mr-2 h-5 w-5' />
          {t('restartQuiz')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Result;
