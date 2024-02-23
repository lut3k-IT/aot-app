import React from 'react';

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

  return (
    <Button
      variant={'proxy'}
      size={'proxy'}
      className={cn('p-1', className)}
      onClick={onToggleFavorite}
    >
      <Icon
        size={iconSize}
        name={'heart'}
        variant={'gray'}
        className={isFilled ? 'fill-red-500 text-red-500 dark:text-red-500' : ''}
      />
    </Button>
  );
};

export default HeartButton;
