'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Heart, SlidersHorizontal, StickyNote } from 'lucide-react';

import {
  ActiveFilter,
  FilterChips,
  FilterChipToggle,
  FilterPanel,
  FilterSection,
  FilterSheet,
  FilterToggle,
  SearchInput,
  SortControl,
  useFilterParams
} from '@/components/filtering';
import { Button } from '@/components/ui/Button';
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
  const hasOnlyNoted = getBooleanParam(searchParams, Param.NOTES);

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

  const handleToggleNoted = useCallback(
    (isChecked: boolean) => {
      setParam(Param.NOTES, isChecked ? 'true' : null);
    },
    [setParam]
  );

  /* ------------------------------ active filters ----------------------------- */

  const allFilterParams = [
    Param.ALLEGIANCE,
    Param.FAVORITES,
    Param.NOTES,
    Param.SEARCH,
    Param.SORT,
    Param.SORT_DIRECTION
  ];

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

    if (hasOnlyNoted) {
      filters.push({
        key: 'noted',
        label: t('common:notes.filterLabel'),
        onRemove: () => setParam(Param.NOTES, null)
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
  }, [selectedAllegiances, hasOnlyFavorites, hasOnlyNoted, search, sortBy, sortDirection, t, toggleArrayParam, setParam]);

  const handleClearAll = useCallback(() => {
    clearAll(allFilterParams);
  }, [clearAll, allFilterParams]);

  /* -------------------------------- filter content ----------------------------- */

  const filterContent = (
    <>
      {/* Sortowanie dla przypadku, gdy nie mieści się w pasku.
          W wysuwanym panelu na telefonie kontener `panel` nie istnieje, więc zapytanie
          nigdy nie trafia i sortowanie jest tam zawsze dostępne. */}
      <div className='@4xl/panel:hidden'>
        <SortControl
          sortBy={sortBy}
          sortDirection={sortDirection}
          sortOptions={TITAN_SORT_OPTIONS}
          onSortByChange={handleSortByChange}
          onSortDirectionToggle={handleSortDirectionToggle}
        />
      </div>
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
    <div className='flex items-center justify-end gap-2'>
      <FilterToggle
        icon={Heart}
        isChecked={hasOnlyFavorites}
        onCheckedChange={handleToggleFavorites}
        label={t('common:filter.showOnlyFavorites')}
      />
      <FilterToggle
        icon={StickyNote}
        isChecked={hasOnlyNoted}
        onCheckedChange={handleToggleNoted}
        label={t('common:notes.filterLabel')}
      />
      <SearchInput
        value={search}
        onSearch={handleSearch}
        placeholder={t('common:filter.searchTitansPlaceholder')}
        className='min-w-0 flex-1 @4xl/bar:max-w-64'
      />
      {/* Sortowanie wchodzi do paska dopiero przy 42rem jego własnej szerokości.
          Wcześniej wypychało pasek poza kolumnę. Poniżej tego progu siedzi w panelu filtrów. */}
      <div className='hidden shrink-0 @2xl/bar:flex'>
        <SortControl
          isToolbar
          sortBy={sortBy}
          sortDirection={sortDirection}
          sortOptions={TITAN_SORT_OPTIONS}
          onSortByChange={handleSortByChange}
          onSortDirectionToggle={handleSortDirectionToggle}
        />
      </div>
      {/* Rozwijany panel filtrów; poniżej 42rem paska przycisk zwija się do samej ikony */}
      <div className='relative hidden shrink-0 md:block'>
        <Button
          variant='outline'
          size='sm'
          className='h-9 gap-1.5 bg-background @max-2xl/bar:w-9 @max-2xl/bar:p-0'
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
          aria-label={t('common:filter.title')}
        >
          <SlidersHorizontal className='h-4 w-4' />
          <span className='@max-2xl/bar:hidden'>{t('common:filter.title')}</span>
          <ChevronDown
            className={cn('h-4 w-4 transition-transform @max-2xl/bar:hidden', isFilterOpen && 'rotate-180')}
          />
        </Button>
        {activeFilters.length > 0 && (
          <span className='absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground'>
            {activeFilters.length}
          </span>
        )}
      </div>
      {/* Filtry na telefonie: wysuwany panel pod kompaktową ikoną */}
      <div className='shrink-0 md:hidden'>
        <FilterSheet
          compact
          activeFilterCount={activeFilters.length}
        >
          {filterContent}
        </FilterSheet>
      </div>
    </div>
  );

  return (
    <div className='col-span-full space-y-2'>
      {/* Portal search+sort+filter button into the "Year 854" heading row */}
      {headingDestination && createPortal(topBar, headingDestination)}

      {/* Desktop: Collapsible filter panel (controlled externally by topBar button) */}
      <div className='@container/panel hidden md:block'>
        <FilterPanel
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <div className='space-y-4'>
            {filterContent}
          </div>
        </FilterPanel>
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
