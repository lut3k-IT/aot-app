'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

import { ActiveFilter, FilterChips, SearchInput, useFilterParams } from '@/components/filtering';
import { Switch } from '@/components/ui/Switch';
import { ElementsIds, Param } from '@/constants/enums';
import { getBooleanParam } from '@/utils/paramsHelpers';

const QuotationFilterBar = () => {
  const { t } = useTranslation();
  const { searchParams, setParam, clearAll } = useFilterParams();

  const [headingDestination, setHeadingDestination] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  const search = searchParams.get(Param.SEARCH) || '';
  const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);

  const handleSearch = useCallback(
    (value: string) => {
      setParam(Param.SEARCH, value || null);
    },
    [setParam]
  );

  const handleToggleFavorites = useCallback(
    (checked: boolean) => {
      setParam(Param.FAVORITES, checked ? 'true' : null);
    },
    [setParam]
  );

  const allFilterParams = [Param.SEARCH, Param.FAVORITES];

  const activeFilters = useMemo(() => {
    const filters: ActiveFilter[] = [];

    if (search) {
      filters.push({
        key: 'search',
        label: `"${search}"`,
        onRemove: () => setParam(Param.SEARCH, null)
      });
    }

    if (hasOnlyFavorites) {
      filters.push({
        key: 'favorites',
        label: t('common:favorites'),
        onRemove: () => setParam(Param.FAVORITES, null)
      });
    }

    return filters;
  }, [search, hasOnlyFavorites, t, setParam]);

  const handleClearAll = useCallback(() => {
    clearAll(allFilterParams);
  }, [clearAll, allFilterParams]);

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
        placeholder={t('common:filter.searchQuotationsPlaceholder')}
        className='w-40 sm:w-56'
      />
    </div>
  );

  return (
    <div className='col-span-full space-y-2'>
      {/* Portal search+favorites into the "Year 854" heading row */}
      {headingDestination && createPortal(topBar, headingDestination)}

      <FilterChips
        activeFilters={activeFilters}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default QuotationFilterBar;
