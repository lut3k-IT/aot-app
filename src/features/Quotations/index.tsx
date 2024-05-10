import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsLandscape from '@/components/hooks/useIsLandscape';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { ElementsIds } from '@/constants/enums';

import SwitchFavorites from '../../components/ui/SwitchFavorites';
import RenderQuotations from './components/RenderQuotations';

const Quotations = () => {
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);
  const isLoading = fetchingStatus === 'loading';
  useApiErrorToast(fetchingError);

  const [shouldShowFavorites, setShouldShowFavorites] = useState(false);
  const hasData = quotations.length > 0;

  // @todo move it to constants
  const [pageHeadingDestination, setPageHeadingDestination] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPageHeadingDestination(document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS));
  }, []);

  return (
    <>
      <AppHelmet title={`${t('common:title.quotations')} ${t('common:tab.gallery')}`} />
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
        <RenderQuotations
          quotations={quotations}
          shouldShowFavorites={shouldShowFavorites}
          favoriteIds={favoriteIds}
          isLoading={isLoading}
          hasData={hasData}
        />
      </GalleryWrapper>
    </>
  );
};

export default Quotations;
