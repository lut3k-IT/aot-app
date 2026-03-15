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
  RangeFilter,
  SearchInput,
  SortControl,
  useFilterParams
} from '@/components/filtering';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { ElementsIds, Param, SortDirection } from '@/constants/enums';
import { HeroSortOption } from '@/constants/types';
import mbtiData from '@/data/mbti';
import residencesData from '@/data/residences';
import speciesData from '@/data/species';
import statusesData from '@/data/statuses';
import {
  DEFAULT_AGE,
  DEFAULT_HEIGHT,
  DEFAULT_SORT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WEIGHT,
  HERO_SORT_OPTIONS
} from '@/features/Heroes/constants';
import { cn } from '@/lib/utils';
import { getBooleanParam, getNumberParam } from '@/utils/paramsHelpers';

const HeroFilterBar = () => {
  const { t } = useTranslation();
  const { searchParams, setParam, setParams, toggleArrayParam, clearAll } = useFilterParams();

  const [headingDestination, setHeadingDestination] = useState<HTMLElement | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    setHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  /* -------------------------------- read params ------------------------------- */

  const search = searchParams.get(Param.SEARCH) || '';
  const sortBy = (searchParams.get(Param.SORT) as HeroSortOption) || DEFAULT_SORT;
  const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_SORT_DIRECTION;
  const selectedStatuses = searchParams.getAll(Param.STATUS);
  const selectedMbti = searchParams.getAll(Param.MBTI);
  const selectedSpecies = searchParams.getAll(Param.SPECIES);
  const selectedResidences = searchParams.getAll(Param.RESIDENCE);
  const ageMin = getNumberParam(searchParams, Param.AGE_MIN, DEFAULT_AGE[0]);
  const ageMax = getNumberParam(searchParams, Param.AGE_MAX, DEFAULT_AGE[1]);
  const heightMin = getNumberParam(searchParams, Param.HEIGHT_MIN, DEFAULT_HEIGHT[0]);
  const heightMax = getNumberParam(searchParams, Param.HEIGHT_MAX, DEFAULT_HEIGHT[1]);
  const weightMin = getNumberParam(searchParams, Param.WEIGHT_MIN, DEFAULT_WEIGHT[0]);
  const weightMax = getNumberParam(searchParams, Param.WEIGHT_MAX, DEFAULT_WEIGHT[1]);
  const hasAge = getBooleanParam(searchParams, Param.HAS_AGE);
  const hasHeight = getBooleanParam(searchParams, Param.HAS_HEIGHT);
  const hasWeight = getBooleanParam(searchParams, Param.HAS_WEIGHT);
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
      setParam(Param.SORT, value === DEFAULT_SORT ? null : value);
    },
    [setParam]
  );

  const handleSortDirectionToggle = useCallback(() => {
    const newDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    setParam(Param.SORT_DIRECTION, newDirection === DEFAULT_SORT_DIRECTION ? null : newDirection);
  }, [sortDirection, setParam]);

  const handleAgeCommit = useCallback(
    (range: number[]) => {
      setParams([
        [Param.AGE_MIN, range[0] !== DEFAULT_AGE[0] ? range[0].toString() : null],
        [Param.AGE_MAX, range[1] !== DEFAULT_AGE[1] ? range[1].toString() : null]
      ]);
    },
    [setParams]
  );

  const handleHeightCommit = useCallback(
    (range: number[]) => {
      setParams([
        [Param.HEIGHT_MIN, range[0] !== DEFAULT_HEIGHT[0] ? range[0].toString() : null],
        [Param.HEIGHT_MAX, range[1] !== DEFAULT_HEIGHT[1] ? range[1].toString() : null]
      ]);
    },
    [setParams]
  );

  const handleWeightCommit = useCallback(
    (range: number[]) => {
      setParams([
        [Param.WEIGHT_MIN, range[0] !== DEFAULT_WEIGHT[0] ? range[0].toString() : null],
        [Param.WEIGHT_MAX, range[1] !== DEFAULT_WEIGHT[1] ? range[1].toString() : null]
      ]);
    },
    [setParams]
  );

  const handleToggleHasAge = useCallback(() => {
    setParam(Param.HAS_AGE, !hasAge ? 'true' : null);
  }, [hasAge, setParam]);

  const handleToggleHasHeight = useCallback(() => {
    setParam(Param.HAS_HEIGHT, !hasHeight ? 'true' : null);
  }, [hasHeight, setParam]);

  const handleToggleHasWeight = useCallback(() => {
    setParam(Param.HAS_WEIGHT, !hasWeight ? 'true' : null);
  }, [hasWeight, setParam]);

  const handleToggleFavorites = useCallback(
    (checked: boolean) => {
      setParam(Param.FAVORITES, checked ? 'true' : null);
    },
    [setParam]
  );

  /* ------------------------------ active filters ----------------------------- */

  const allFilterParams = [
    Param.STATUS,
    Param.MBTI,
    Param.SPECIES,
    Param.RESIDENCE,
    Param.AGE_MIN,
    Param.AGE_MAX,
    Param.HEIGHT_MIN,
    Param.HEIGHT_MAX,
    Param.WEIGHT_MIN,
    Param.WEIGHT_MAX,
    Param.HAS_AGE,
    Param.HAS_HEIGHT,
    Param.HAS_WEIGHT,
    Param.FAVORITES,
    Param.SEARCH,
    Param.SORT,
    Param.SORT_DIRECTION
  ];

  const activeFilters = useMemo(() => {
    const filters: ActiveFilter[] = [];

    selectedStatuses.forEach((s) => {
      filters.push({
        key: `status-${s}`,
        label: t(`data:status.${s}.long`),
        onRemove: () => toggleArrayParam(Param.STATUS, s)
      });
    });

    selectedMbti.forEach((m) => {
      filters.push({
        key: `mbti-${m}`,
        label: m,
        onRemove: () => toggleArrayParam(Param.MBTI, m)
      });
    });

    selectedSpecies.forEach((s) => {
      filters.push({
        key: `species-${s}`,
        label: t(`data:species.${s}`),
        onRemove: () => toggleArrayParam(Param.SPECIES, s)
      });
    });

    selectedResidences.forEach((r) => {
      filters.push({
        key: `residence-${r}`,
        label: t(`data:residence.${r}`),
        onRemove: () => toggleArrayParam(Param.RESIDENCE, r)
      });
    });

    if (ageMin !== DEFAULT_AGE[0] || ageMax !== DEFAULT_AGE[1]) {
      filters.push({
        key: 'age-range',
        label: `${t('data:age.title')}: ${ageMin}-${ageMax}`,
        onRemove: () => setParams([[Param.AGE_MIN, null], [Param.AGE_MAX, null]])
      });
    }

    if (heightMin !== DEFAULT_HEIGHT[0] || heightMax !== DEFAULT_HEIGHT[1]) {
      filters.push({
        key: 'height-range',
        label: `${t('data:height.title')}: ${heightMin}-${heightMax}`,
        onRemove: () => setParams([[Param.HEIGHT_MIN, null], [Param.HEIGHT_MAX, null]])
      });
    }

    if (weightMin !== DEFAULT_WEIGHT[0] || weightMax !== DEFAULT_WEIGHT[1]) {
      filters.push({
        key: 'weight-range',
        label: `${t('data:weight.title')}: ${weightMin}-${weightMax}`,
        onRemove: () => setParams([[Param.WEIGHT_MIN, null], [Param.WEIGHT_MAX, null]])
      });
    }

    if (hasAge) {
      filters.push({
        key: 'has-age',
        label: t('data:age.boolean'),
        onRemove: () => setParam(Param.HAS_AGE, null)
      });
    }
    if (hasHeight) {
      filters.push({
        key: 'has-height',
        label: t('data:height.boolean'),
        onRemove: () => setParam(Param.HAS_HEIGHT, null)
      });
    }
    if (hasWeight) {
      filters.push({
        key: 'has-weight',
        label: t('data:weight.boolean'),
        onRemove: () => setParam(Param.HAS_WEIGHT, null)
      });
    }

    if (hasOnlyFavorites) {
      filters.push({
        key: 'favorites',
        label: t('common:favorites'),
        onRemove: () => setParam(Param.FAVORITES, null)
      });
    }

    if (sortBy !== DEFAULT_SORT) {
      filters.push({
        key: 'sort',
        label: `${t('common:filter.sortBy')}: ${t(`common:sort.value.${sortBy}`)}`,
        onRemove: () => setParam(Param.SORT, null)
      });
    }

    if (sortDirection !== DEFAULT_SORT_DIRECTION) {
      filters.push({
        key: 'sort-dir',
        label: t(`common:sort.direction.${sortDirection}.long`),
        onRemove: () => setParam(Param.SORT_DIRECTION, null)
      });
    }

    if (search) {
      filters.push({
        key: 'search',
        label: `"${search}"`,
        onRemove: () => setParam(Param.SEARCH, null)
      });
    }

    return filters;
  }, [
    selectedStatuses,
    selectedMbti,
    selectedSpecies,
    selectedResidences,
    ageMin,
    ageMax,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    hasAge,
    hasHeight,
    hasWeight,
    hasOnlyFavorites,
    sortBy,
    sortDirection,
    search,
    t,
    toggleArrayParam,
    setParams,
    setParam
  ]);

  const handleClearAll = useCallback(() => {
    clearAll(allFilterParams);
  }, [clearAll, allFilterParams]);

  /* -------------------------------- filter content ----------------------------- */

  const filterContent = (
    <div className='space-y-3'>
      {/* Status */}
      <FilterSection
        inline
        title={t('data:status.title')}
      >
        <div className='flex flex-wrap gap-1.5'>
          {statusesData.map((data) => (
            <FilterChipToggle
              key={data.id}
              isActive={selectedStatuses.includes(data.keyName)}
              onClick={() => toggleArrayParam(Param.STATUS, data.keyName)}
              aria-label={t(`data:status.${data.keyName}.long`)}
            >
              {t(`data:status.${data.keyName}.long`)}
            </FilterChipToggle>
          ))}
        </div>
      </FilterSection>

      {/* Species */}
      <FilterSection
        inline
        title={t('data:species.title')}
      >
        <div className='flex flex-wrap gap-1.5'>
          {speciesData.map((data) => (
            <FilterChipToggle
              key={data.id}
              isActive={selectedSpecies.includes(data.keyName)}
              onClick={() => toggleArrayParam(Param.SPECIES, data.keyName)}
              aria-label={t(`data:species.${data.keyName}`)}
            >
              {t(`data:species.${data.keyName}`)}
            </FilterChipToggle>
          ))}
        </div>
      </FilterSection>

      {/* Residence */}
      <FilterSection
        inline
        title={t('data:residence.title')}
      >
        <div className='flex flex-wrap gap-1.5'>
          {residencesData.map((data) => (
            <FilterChipToggle
              key={data.id}
              isActive={selectedResidences.includes(data.keyName)}
              onClick={() => toggleArrayParam(Param.RESIDENCE, data.keyName)}
              aria-label={t(`data:residence.${data.keyName}`)}
            >
              {t(`data:residence.${data.keyName}`)}
            </FilterChipToggle>
          ))}
        </div>
      </FilterSection>

      {/* MBTI */}
      <FilterSection
        inline
        title={t('data:mbti.title')}
      >
        <div className='grid grid-cols-8 gap-1.5'>
          {mbtiData.map((data) => (
            <FilterChipToggle
              key={data.id}
              isActive={selectedMbti.includes(data.shortName)}
              onClick={() => toggleArrayParam(Param.MBTI, data.shortName)}
              aria-label={data.shortName}
            >
              {data.shortName}
            </FilterChipToggle>
          ))}
        </div>
      </FilterSection>

      {/* Has info about */}
      <FilterSection
        inline
        title={t('common:filter.hasInfoAbout')}
      >
        <div className='flex flex-wrap gap-1.5'>
          <FilterChipToggle
            isActive={hasAge}
            onClick={handleToggleHasAge}
            aria-label={t('data:age.title')}
          >
            {t('data:age.title')}
          </FilterChipToggle>
          <FilterChipToggle
            isActive={hasHeight}
            onClick={handleToggleHasHeight}
            aria-label={t('data:height.title')}
          >
            {t('data:height.title')}
          </FilterChipToggle>
          <FilterChipToggle
            isActive={hasWeight}
            onClick={handleToggleHasWeight}
            aria-label={t('data:weight.title')}
          >
            {t('data:weight.title')}
          </FilterChipToggle>
        </div>
      </FilterSection>

      {/* Ranges */}
      <div className='grid gap-3 sm:grid-cols-3'>
        <RangeFilter
          label={t('data:age.title')}
          min={DEFAULT_AGE[0]}
          max={DEFAULT_AGE[1]}
          currentRange={[ageMin, ageMax]}
          defaultRange={DEFAULT_AGE}
          onCommit={handleAgeCommit}
        />
        <RangeFilter
          label={t('data:height.title')}
          unit='cm'
          min={DEFAULT_HEIGHT[0]}
          max={DEFAULT_HEIGHT[1]}
          currentRange={[heightMin, heightMax]}
          defaultRange={DEFAULT_HEIGHT}
          onCommit={handleHeightCommit}
        />
        <RangeFilter
          label={t('data:weight.title')}
          unit='kg'
          min={DEFAULT_WEIGHT[0]}
          max={DEFAULT_WEIGHT[1]}
          currentRange={[weightMin, weightMax]}
          defaultRange={DEFAULT_WEIGHT}
          onCommit={handleWeightCommit}
        />
      </div>
    </div>
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
        placeholder={t('common:filter.searchPlaceholder')}
        className='w-40 sm:w-56'
      />
      <SortControl
        sortBy={sortBy}
        sortDirection={sortDirection}
        sortOptions={HERO_SORT_OPTIONS}
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
          {filterContent}
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

export default HeroFilterBar;
