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
        'h-auto w-full whitespace-normal px-2 py-1.5 hover:bg-inherit',
        className,
        isActive ? 'border-red-300 !text-primary dark:border-red-500/50' : ''
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FilterButton;
