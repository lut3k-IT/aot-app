import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import { useToast } from '@/components/hooks/useToast';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import NoResults from '@/components/ui/NoResults';
import PageHeading from '@/components/ui/PageHeading';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { CARD_SKELETONS } from '@/constants/constants';

const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <QuotationCardSkeleton key={index} />);

const Quotations = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);
  const isLoading = fetchingStatus === 'loading';

  const hasData = quotations.length > 0;

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

  return (
    <>
      <AppHelmet title={`${t('common:title.quotations')} ${t('common:tab.gallery')}`} />
      {/* @remind this is a bad practice - fix it later */}
      <MovingPanel className={'md:pt-0'}>
        <PageHeading className={'md:pt-0'} />
      </MovingPanel>
      <GalleryWrapper>
        {hasData && !isLoading ? (
          hasData ? (
            quotations.map((quotation) => (
              <QuotationCard
                key={quotation.id}
                id={quotation.id}
                text={quotation.text}
                favoritesList={favoriteIds}
              />
            ))
          ) : (
            <NoResults />
          )
        ) : (
          <SkeletonCards />
        )}
      </GalleryWrapper>
    </>
  );
};

export default Quotations;
