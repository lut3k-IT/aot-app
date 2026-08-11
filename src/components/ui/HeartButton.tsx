import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { HEART_SPRING } from '@/constants/motion';
import { cn } from '@/lib/utils';

import { Button } from './Button';
import HeartBurst from './HeartBurst';
import Icon, { IconSizes } from './Icon';

interface HeartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onToggleFavorite: (event: React.MouseEvent) => void;
  iconSize?: IconSizes;
  className?: string;
  isFilled?: boolean;
}

const HeartButton = (props: HeartButtonProps) => {
  const { onToggleFavorite, iconSize, className, isFilled } = props;
  const { t } = useTranslation();
  const [burstKey, setBurstKey] = useState(0);
  const wasFilledRef = useRef(isFilled);

  // Efekt odpala sie wylacznie przy przejsciu z nieulubionego na ulubione,
  // dzieki czemu miejsca uzycia przycisku pozostaja nietkniete.
  useEffect(() => {
    if (isFilled && !wasFilledRef.current) {
      setBurstKey((previous) => previous + 1);
    }
    wasFilledRef.current = isFilled;
  }, [isFilled]);

  return (
    <Button
      variant={'proxy'}
      size={'proxy'}
      className={cn('relative overflow-visible p-1', className)}
      onClick={onToggleFavorite}
      aria-label={isFilled ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    >
      <HeartBurst burstKey={burstKey} />
      <motion.span
        className={'block'}
        animate={{ scale: isFilled ? [1, 1.35, 1] : [1, 0.9, 1] }}
        transition={HEART_SPRING}
      >
        <Icon
          size={iconSize}
          name={'heart'}
          variant={'gray'}
          className={isFilled ? 'fill-primary text-primary dark:text-primary' : ''}
        />
      </motion.span>
    </Button>
  );
};

export default HeartButton;
