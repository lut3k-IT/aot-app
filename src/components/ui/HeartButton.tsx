import { cn } from '@/lib/utils';

import { Button } from './Button';
import Icon, { IconSizes } from './Icon';

// TODO:
// ts button element
// quote id
// is in favorites (filled icon)

interface HeartButtonProps {
  iconSize?: IconSizes;
  className?: string;
}

const HeartButton = (props: HeartButtonProps) => {
  const { iconSize, className } = props;
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
      />
    </Button>
  );
};

export default HeartButton;
