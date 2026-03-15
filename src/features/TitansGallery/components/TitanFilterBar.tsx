'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Heart, SlidersHorizontal } from 'lucide-react';

import {
  ActiveFilter,
  FilterChips,
  FilterChipToggle,
  FilterPanel,
  FilterSection,
  FilterSheet,
  SearchInput,
  SortControl,
  useFilterParams
} from '@/components/filtering';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { ElementsIds, Param, SortDirection } from '@/constants/enums';
import { TitanSortOption } from '@/constants/types';
import allegiances from '@/data/allegiances';
import { DEFAULT_TITAN_SORT, DEFAULT_TITAN_SORT_DIRECTION, TITAN_SORT_OPTIONS } from '@/features/TitansGallery/constants';
import { cn } from '@/lib/utils';
import { getBooleanParam } from '@/utils/paramsHelpers';

const TitanFilterBar = () => {
  const { t } = useTranslation();
  const { searchParams, setParam, toggleArrayParam, clearAll } = useFilterParams();

  const [headingDestination, setHeadingDestination] = useState<HTMLElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    setHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  /* -------------------------------- read params ------------------------------- */

  const search = searchParams.get(Param.SEARCH) || '';
  const sortBy = (searchParams.get(Param.SORT) as TitanSortOption) || DEFAULT_TITAN_SORT;
  const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_TITAN_SORT_DIRECTION;
  const selectedAllegiances = searchParams.getAll(Param.ALLEGIANCE);
  const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);

  /* -------------------------------- handlers -------------------------------- */

  const handleSearch = useCallback(
    (value: string) => {
      setParam(Param.SEARCH, value || null);
    },
    [setParam]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      setParam(Param.SORT, value === DEFAULT_TITAN_SORT ? null : value);
    },
    [setParam]
  );

  const handleSortDirectionToggle = useCallback(() => {
    const newDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    setParam(Param.SORT_DIRECTION, newDirection === DEFAULT_TITAN_SORT_DIRECTION ? null : newDirection);
  }, [sortDirection, setParam]);

  const handleToggleFavorites = useCallback(
    (checked: boolean) => {
      setParam(Param.FAVORITES, checked ? 'true' : null);
    },
    [setParam]
  );

  /* ------------------------------ active filters ----------------------------- */

  const allFilterParams = [Param.ALLEGIANCE, Param.FAVORITES, Param.SEARCH, Param.SORT, Param.SORT_DIRECTION];

  const activeFilters = useMemo(() => {
    const filters: ActiveFilter[] = [];

    selectedAllegiances.forEach((a) => {
      const allegiance = allegiances.find((al) => al.id.toString() === a);
      if (allegiance) {
        filters.push({
          key: `allegiance-${a}`,
          label: t(`data:allegiance.${allegiance.keyName}`),
          onRemove: () => toggleArrayParam(Param.ALLEGIANCE, a)
        });
      }
    });

    if (hasOnlyFavorites) {
      filters.push({
        key: 'favorites',
        label: t('common:favorites'),
        onRemove: () => setParam(Param.FAVORITES, null)
      });
    }

    if (search) {
      filters.push({
        key: 'search',
        label: `"${search}"`,
        onRemove: () => setParam(Param.SEARCH, null)
      });
    }

    if (sortBy !== DEFAULT_TITAN_SORT) {
      filters.push({
        key: 'sort',
        label: `${t('common:filter.sortBy')}: ${t(`common:sort.value.${sortBy}`)}`,
        onRemove: () => setParam(Param.SORT, null)
      });
    }

    if (sortDirection !== DEFAULT_TITAN_SORT_DIRECTION) {
      filters.push({
        key: 'sort-dir',
        label: t(`common:sort.direction.${sortDirection}.long`),
        onRemove: () => setParam(Param.SORT_DIRECTION, null)
      });
    }

    return filters;
  }, [selectedAllegiances, hasOnlyFavorites, search, sortBy, sortDirection, t, toggleArrayParam, setParam]);

  const handleClearAll = useCallback(() => {
    clearAll(allFilterParams);
  }, [clearAll, allFilterParams]);

  /* -------------------------------- filter content ----------------------------- */

  const filterContent = (
    <>
      {/* Allegiance */}
      <FilterSection title={t('data:allegiance.title')}>
        <div className='flex flex-wrap gap-1.5'>
          {allegiances.map((data) => (
            <FilterChipToggle
              key={data.id}
              isActive={selectedAllegiances.includes(data.id.toString())}
              onClick={() => toggleArrayParam(Param.ALLEGIANCE, data.id.toString())}
              aria-label={t(`data:allegiance.${data.keyName}`)}
            >
              {t(`data:allegiance.${data.keyName}`)}
            </FilterChipToggle>
          ))}
        </div>
      </FilterSection>

    </>
  );

  const topBar = (
    <div className='flex items-center gap-2'>
      <button
        type='button'
        className='flex items-center gap-1.5'
        onClick={() => handleToggleFavorites(!hasOnlyFavorites)}
        aria-label={t('common:filter.showOnlyFavorites')}
      >
        <Heart
          className='h-5 w-5 text-foreground'
        />
        <Switch
          checked={hasOnlyFavorites}
          onCheckedChange={handleToggleFavorites}
          aria-hidden
        />
      </button>
      <SearchInput
        value={search}
        onSearch={handleSearch}
        placeholder={t('common:filter.searchTitansPlaceholder')}
        className='w-40 sm:w-56'
      />
      <SortControl
        sortBy={sortBy}
        sortDirection={sortDirection}
        sortOptions={TITAN_SORT_OPTIONS}
        onSortByChange={handleSortByChange}
        onSortDirectionToggle={handleSortDirectionToggle}
      />
      {/* Filter toggle — desktop only */}
      <div className='relative hidden md:block'>
        <Button
          variant='outline'
          size='sm'
          className='h-9 gap-1.5 bg-background'
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
        >
          <SlidersHorizontal className='h-4 w-4' />
          {t('common:filter.title')}
          <ChevronDown className={cn('h-4 w-4 transition-transform', isFilterOpen && 'rotate-180')} />
        </Button>
        {activeFilters.length > 0 && (
          <span className='absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground'>
            {activeFilters.length}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className='col-span-full space-y-2'>
      {/* Portal search+sort+filter button into the "Year 854" heading row */}
      {headingDestination && createPortal(topBar, headingDestination)}

      {/* Desktop: Collapsible filter panel (controlled externally by topBar button) */}
      <div className='hidden md:block'>
        <FilterPanel
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <div className='space-y-4'>
            {filterContent}
          </div>
        </FilterPanel>
      </div>

      {/* Mobile: Sheet with its own trigger */}
      <div className='md:hidden'>
        <FilterSheet activeFilterCount={activeFilters.length}>
          {filterContent}
        </FilterSheet>
      </div>

      {/* Active filter chips */}
      <FilterChips
        activeFilters={activeFilters}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default TitanFilterBar;
