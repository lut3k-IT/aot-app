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
    <div className={cn(inline ? 'flex items-start gap-3' : 'space-y-1.5', className)}>
      <span
        className={cn(
          'text-xs font-medium text-muted-foreground',
          inline && 'w-[6.5rem] shrink-0 pt-1 text-right'
        )}
      >
        {title}
      </span>
      {children}
    </div>
  );
};

export default FilterSection;
