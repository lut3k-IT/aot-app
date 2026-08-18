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
  /**
   * Wariant do paska filtrów: blokuje ściskanie kontrolki przez sąsiadów.
   * Sam pasek pokazuje sortowanie dopiero przy 42rem swojej szerokości
   * (patrz HeroFilterBar), więc nie ma tu potrzeby dodatkowego zwężania.
   */
  isToolbar?: boolean;
}

const SortControl = ({
  sortBy,
  sortDirection,
  sortOptions,
  onSortByChange,
  onSortDirectionToggle,
  i18nPrefix = 'common:sort.value',
  className,
  isToolbar
}: SortControlProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex gap-2', className)}>
      <Select
        value={sortBy}
        onValueChange={onSortByChange}
      >
        <SelectTrigger className={cn('h-9 w-36 font-medium', isToolbar && 'shrink-0')}>
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
        className={cn('h-9 w-20 bg-background', isToolbar && 'shrink-0')}
        onClick={onSortDirectionToggle}
        aria-label={t('common:sort.direction.toggle')}
      >
        {t(`common:sort.direction.${sortDirection}.short`)}
      </Button>
    </div>
  );
};

export default SortControl;
