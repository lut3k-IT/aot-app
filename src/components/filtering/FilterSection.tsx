'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

const FilterSection = ({ title, children, className, inline }: FilterSectionProps) => {
  return (
    <div
      className={cn(
        inline ? 'space-y-1.5 sm:flex sm:items-start sm:gap-3 sm:space-y-0' : 'space-y-1.5',
        className
      )}
    >
      <span
        className={cn(
          'text-xs font-medium text-muted-foreground',
          inline && 'sm:w-[6.5rem] sm:shrink-0 sm:pt-1 sm:text-right'
        )}
      >
        {title}
      </span>
      {inline ? <div className='min-w-0 sm:flex-1'>{children}</div> : children}
    </div>
  );
};

export default FilterSection;
