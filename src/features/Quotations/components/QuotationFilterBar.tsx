'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

import { ActiveFilter, FilterChips, FilterToggle, SearchInput, useFilterParams } from '@/components/filtering';
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
    <div className='flex items-center justify-end gap-2'>
      <FilterToggle
        icon={Heart}
        isChecked={hasOnlyFavorites}
        onCheckedChange={handleToggleFavorites}
        label={t('common:filter.showOnlyFavorites')}
      />
      <SearchInput
        value={search}
        onSearch={handleSearch}
        placeholder={t('common:filter.searchQuotationsPlaceholder')}
        className='min-w-0 flex-1 @4xl/bar:max-w-64'
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
