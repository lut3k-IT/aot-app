'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface FilterChipToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

const FilterChipToggle = (props: FilterChipToggleProps) => {
  const { children, isActive, className, ...rest } = props;
  return (
    <button
      type='button'
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive
          ? 'border-primary bg-primary/10 text-primary dark:border-primary/70 dark:bg-primary/20'
          : 'border-input bg-card text-muted-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default FilterChipToggle;
