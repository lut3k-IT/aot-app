import React from 'react';

import { Button, ButtonProps } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FilterButtonProps extends ButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

const FilterButton = (props: FilterButtonProps) => {
  const { children, isActive, className, ...rest } = props;
  return (
    <Button
      variant={'outline'}
      className={cn(
        'w-full h-auto py-1 px-2 whitespace-normal hover:bg-inherit',
        className,
        isActive ? 'border-red-300 !text-primary' : ''
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FilterButton;
