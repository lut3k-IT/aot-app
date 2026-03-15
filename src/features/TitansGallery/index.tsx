'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import DynamicTitle from '@/components/ui/DynamicTitle';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { Param, SortDirection } from '@/constants/enums';
import { TitanSortOption } from '@/constants/types';
import { selectHeroesData } from '@/store/heroesSlice';
import { selectTitansData, selectTitansError, selectTitansFavoriteIds, selectTitansStatus } from '@/store/titansSlice';
import { getBooleanParam } from '@/utils/paramsHelpers';

import Content from './components/Content';
import TitanFilterBar from './components/TitanFilterBar';
import { filterTitans } from './utils/titansProcessing';
import { DEFAULT_TITAN_SORT, DEFAULT_TITAN_SORT_DIRECTION } from './constants';

const TitansGallery = () => {
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();
  const searchParams = useSearchParams();

  const originalTitans = useAppSelector(selectTitansData);
  const originalHeroes = useAppSelector(selectHeroesData);

  const favoriteTitansIds = useAppSelector(selectTitansFavoriteIds);
  const fetchingStatus = useAppSelector(selectTitansStatus);
  const fetchingError = useAppSelector(selectTitansError);
  const isLoading = fetchingStatus === 'loading';
  useApiErrorToast(fetchingError);

  const hasData = originalTitans.length > 0;

  /* --------------------------------- filters -------------------------------- */

  const filteredTitans = useMemo(() => {
    const search = searchParams.get(Param.SEARCH);
    const sortBy = (searchParams.get(Param.SORT) as TitanSortOption) || DEFAULT_TITAN_SORT;
    const sortDirection = (searchParams.get(Param.SORT_DIRECTION) as SortDirection) || DEFAULT_TITAN_SORT_DIRECTION;
    const allegiance = searchParams.getAll(Param.ALLEGIANCE).map(Number).filter((n) => !isNaN(n));
    const hasOnlyFavorites = getBooleanParam(searchParams, Param.FAVORITES);

    return filterTitans(
      originalTitans,
      { search, sort: sortBy, sortDirection, allegiance, hasOnlyFavorites },
      favoriteTitansIds
    );
  }, [originalTitans, searchParams, favoriteTitansIds]);

  const hasDataToShow = filteredTitans.length > 0;

  return (
    <>
      <DynamicTitle title={`${t('common:title.titans')} ${t('common:tab.gallery')}`} />
      <MovingPanel className={isLandscape ? '' : 'md:pt-0'}>
        <PageHeading className={isLandscape ? '' : 'md:pt-0'} />
      </MovingPanel>
      <GalleryWrapper>
        <TitanFilterBar />
        <Content
          titans={filteredTitans}
          favoriteTitansIds={favoriteTitansIds}
          originalHeroes={originalHeroes}
          isLoading={isLoading}
          hasData={hasData}
          hasDataToShow={hasDataToShow}
        />
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
