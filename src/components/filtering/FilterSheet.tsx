'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';

interface FilterSheetProps {
  children: React.ReactNode;
  activeFilterCount?: number;
}

const FilterSheet = ({ children, activeFilterCount = 0 }: FilterSheetProps) => {
  const { t } = useTranslation();

  return (
    <Sheet>
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
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>{t('common:filter.title')}</SheetTitle>
        </SheetHeader>
        <ScrollArea className='h-[calc(100vh-5rem)] pr-4 mt-4'>
          <div className='space-y-6'>
            {children}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
