import React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import { Button } from './Button';
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

  return (
    <Button
      variant={'proxy'}
      size={'proxy'}
      className={cn('p-1', className)}
      onClick={onToggleFavorite}
      aria-label={isFilled ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
    >
      <Icon
        size={iconSize}
        name={'heart'}
        variant={'gray'}
        className={isFilled ? 'fill-primary text-primary dark:text-primary' : ''}
      />
    </Button>
  );
};

export default HeartButton;
