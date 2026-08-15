import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimationControls } from 'framer-motion';

import { HEART_PULSE } from '@/constants/motion';
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
  const pulseControls = useAnimationControls();

  // Puls sterowany imperatywnie, a nie przez `animate` z tablica klatek.
  // Deklaratywna wersja odtwarzalaby animacje przy montowaniu, przez co kazde
  // serce w galerii pulsowaloby po wejsciu na strone.
  // Efekt odpala sie wylacznie przy zmianie stanu, dzieki czemu miejsca uzycia
  // przycisku pozostaja nietkniete.
  useEffect(() => {
    if (isFilled === wasFilledRef.current) return;
    wasFilledRef.current = isFilled;

    if (isFilled) {
      setBurstKey((previous) => previous + 1);
    }

    pulseControls.start({ scale: isFilled ? [1, 1.35, 1] : [1, 0.9, 1] });
  }, [isFilled, pulseControls]);

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
        animate={pulseControls}
        transition={HEART_PULSE}
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
