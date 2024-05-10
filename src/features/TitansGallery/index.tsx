import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import { useToast } from '@/components/hooks/useToast';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { ElementsIds } from '@/constants/enums';

import SwitchFavorites from '../../components/ui/SwitchFavorites';
import Content from './components/Content';

const TitansGallery = () => {
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();

  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);

  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.titans.status);
  const fetchingError = useAppSelector((state) => state.titans.error);
  useApiErrorToast(fetchingError);
  const isLoading = fetchingStatus === 'loading';

  // @todo remove this states and use the ones from the store because there won't be any filtering or pagination
  const [filteredTitans, setFilteredTitans] = useState(originalTitans);
  const [paginatedTitans, setPaginatedTitans] = useState(originalTitans);

  const [shouldShowFavorites, setShouldShowFavorites] = useState(false);
  const hasData = originalTitans.length > 0;
  const hasDataToShow = paginatedTitans.length > 0;

  // @todo move it to constants
  const [pageHeadingDestination, setPageHeadingDestination] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPageHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  useEffect(() => {
    setFilteredTitans(originalTitans);
    setPaginatedTitans(originalTitans);
  }, [originalTitans]);

  // @todo DRY this up
  /* ------------------------------- error toast ------------------------------- */

  return (
    <>
      <AppHelmet title={`${t('common:title.titans')} ${t('common:tab.gallery')}`} />
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
          paginatedTitans={paginatedTitans}
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
