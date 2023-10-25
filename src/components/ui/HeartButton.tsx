import { cn } from '@/lib/utils';

import { Button } from './Button';
import Icon, { IconSizes } from './Icon';

interface HeartButtonProps {
  iconSize?: IconSizes;
  className?: string;
  isFilled?: boolean;
}

const HeartButton = (props: HeartButtonProps) => {
  const { iconSize, className, isFilled } = props;

  return (
    <Button
      variant={'proxy'}
      size={'proxy'}
      className={cn('p-1', className)}
    >
      <Icon
        size={iconSize}
        name={'heart'}
        variant={'gray'}
        className={isFilled ? 'text-red-500 fill-red-500' : ''}
      />
    </Button>
  );
};

export default HeartButton;
