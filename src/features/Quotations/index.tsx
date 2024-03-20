import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import { useToast } from '@/components/hooks/useToast';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { ElementsIds } from '@/constants/enums';

import SwitchFavorites from '../../components/ui/SwitchFavorites';
import RenderQuotations from './components/RenderQuotations';

const Quotations = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);
  const isLoading = fetchingStatus === 'loading';

  const [shouldShowFavorites, setShouldShowFavorites] = useState(false);
  const hasData = quotations.length > 0;

  // @todo move it to constants
  const pageHeadingDestination = document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS);

  /* ------------------------------- error toast ------------------------------- */

  useEffect(() => {
    if (fetchingError) {
      toast({
        variant: 'destructive',
        title: t('notifications:error.somethingWentWrong'),
        description: t('notifications:error.tryAgainLater')
      });
    }
  }, [fetchingError]);

  /* ---------------------------- render quotations --------------------------- */

  return (
    <>
      <AppHelmet title={`${t('common:title.quotations')} ${t('common:tab.gallery')}`} />
      <MovingPanel className={'md:pt-0'}>
        <PageHeading className={'md:pt-0'} />
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
