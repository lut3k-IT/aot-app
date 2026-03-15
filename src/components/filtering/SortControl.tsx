'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { SortDirection } from '@/constants/enums';
import { cn } from '@/lib/utils';

interface SortControlProps {
  sortBy: string;
  sortDirection: SortDirection;
  sortOptions: string[];
  onSortByChange: (value: string) => void;
  onSortDirectionToggle: () => void;
  i18nPrefix?: string;
  className?: string;
}

const SortControl = ({
  sortBy,
  sortDirection,
  sortOptions,
  onSortByChange,
  onSortDirectionToggle,
  i18nPrefix = 'common:sort.value',
  className
}: SortControlProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex gap-2', className)}>
      <Select
        value={sortBy}
        onValueChange={onSortByChange}
      >
        <SelectTrigger className='h-9 w-[9rem] font-medium'>
          <SelectValue placeholder={t('common:filter.sortBy')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
              >
                {t(`${i18nPrefix}.${option}`)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        variant='outline'
        iconName={sortDirection === SortDirection.ASC ? 'arrowDownNarrowWide' : 'arrowDownWideNarrow'}
        iconPosition='right'
        size='sm'
        className='h-9 w-20 bg-background'
        onClick={onSortDirectionToggle}
        aria-label={t('common:sort.direction.toggle')}
      >
        {t(`common:sort.direction.${sortDirection}.short`)}
      </Button>
    </div>
  );
};

export default SortControl;
