'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface ActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface FilterChipsProps {
  activeFilters: ActiveFilter[];
  onClearAll: () => void;
  className?: string;
}

const FilterChips = ({ activeFilters, onClearAll, className }: FilterChipsProps) => {
  const { t } = useTranslation();

  if (activeFilters.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5 col-span-full', className)}>
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant='outline'
          className='gap-1 py-0.5 pl-2 pr-1 text-xs'
        >
          <span>{filter.label}</span>
          <button
            type='button'
            onClick={filter.onRemove}
            className='ml-0.5 rounded-full p-0.5 hover:bg-accent'
            aria-label={`${t('common:action.reset')} ${filter.label}`}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}
      <button
        type='button'
        onClick={onClearAll}
        className='text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
      >
        {t('common:action.resetAll')}
      </button>
    </div>
  );
};

export default FilterChips;
