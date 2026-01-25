'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import DynamicTitle from '@/components/ui/DynamicTitle';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { ElementsIds } from '@/constants/enums';
import { selectHeroesData } from '@/store/heroesSlice';
import { selectTitansData, selectTitansError, selectTitansFavoriteIds, selectTitansStatus } from '@/store/titansSlice';

import SwitchFavorites from '../../components/ui/SwitchFavorites';
import Content from './components/Content';

const TitansGallery = () => {
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();

  const originalTitans = useAppSelector(selectTitansData);
  const originalHeroes = useAppSelector(selectHeroesData);

  const favoriteTitansIds = useAppSelector(selectTitansFavoriteIds);
  const fetchingStatus = useAppSelector(selectTitansStatus);
  const fetchingError = useAppSelector(selectTitansError);
  const isLoading = fetchingStatus === 'loading';
  useApiErrorToast(fetchingError);

  const [shouldShowFavorites, setShouldShowFavorites] = useState(false);
  const hasData = originalTitans.length > 0;

  const [pageHeadingDestination, setPageHeadingDestination] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPageHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  return (
    <>
      <DynamicTitle title={`${t('common:title.titans')} ${t('common:tab.gallery')}`} />
      <MovingPanel className={isLandscape ? '' : 'md:pt-0'}>
        <PageHeading className={isLandscape ? '' : 'md:pt-0'} />
        {pageHeadingDestination &&
          createPortal(
            <SwitchFavorites
              shouldShowFavorites={shouldShowFavorites}
              onCheckedChange={setShouldShowFavorites}
            />,
            pageHeadingDestination
          )}
      </MovingPanel>
      <GalleryWrapper>
        <Content
          paginatedTitans={originalTitans}
          shouldShowFavorites={shouldShowFavorites}
          favoriteTitansIds={favoriteTitansIds}
          originalHeroes={originalHeroes}
          isLoading={isLoading}
          hasData={hasData}
        />
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
