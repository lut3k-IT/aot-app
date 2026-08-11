'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { MOTION_DURATION, scaleIn } from '@/constants/motion';
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
      {/* Klucz jest na elemencie opakowujacym — AnimatePresence potrzebuje go na swoim bezposrednim dziecku. */}
      <AnimatePresence initial={false}>
        {activeFilters.map((filter) => (
          <motion.div
            key={filter.key}
            variants={scaleIn}
            initial={'hidden'}
            animate={'show'}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: MOTION_DURATION.fast } }}
          >
            <Badge
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
          </motion.div>
        ))}
      </AnimatePresence>
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
