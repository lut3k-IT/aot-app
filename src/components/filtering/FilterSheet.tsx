'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';

interface FilterSheetProps {
  children: React.ReactNode;
  activeFilterCount?: number;
  compact?: boolean;
}

const FilterSheet = ({ children, activeFilterCount = 0, compact }: FilterSheetProps) => {
  const { t } = useTranslation();

  return (
    <Sheet>
      {compact ? (
        <div className='relative'>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='h-9 w-9 bg-background p-0'
              aria-label={t('common:filter.title')}
            >
              <SlidersHorizontal className='h-4 w-4' />
            </Button>
          </SheetTrigger>
          {activeFilterCount > 0 && (
            <span className='absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground'>
              {activeFilterCount}
            </span>
          )}
        </div>
      ) : (
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            iconName='filter'
            iconSize='xs'
            className='text-muted-foreground hover:text-muted-foreground'
            aria-label={t('common:filter.title')}
          >
            {t('common:filter.title')}
            {activeFilterCount > 0 && (
              <span className='ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground'>
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        side='bottom'
        className='flex max-h-[85vh] flex-col overflow-hidden rounded-t-2xl p-4'
      >
        <SheetHeader className='shrink-0'>
          <SheetTitle>{t('common:filter.title')}</SheetTitle>
        </SheetHeader>
        <div className='min-h-0 flex-1 overflow-y-auto'>
          <div className='space-y-4 pb-2 px-1 pt-1'>{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
