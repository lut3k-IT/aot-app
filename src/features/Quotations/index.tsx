import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import useIsMobile from '@/components/hooks/useIsMobile';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import QuotationCard from '@/components/ui/QuotationCard';

const Quotations = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  return (
    <>
      <AppHelmet title={`${t('common:title.quotations')} ${t('common:tab.gallery')}`} />
      {/* @remind this is a bad practice - fix it later */}
      <MovingPanel className={!isMobile ? '!pt-0' : ''}>
        <PageHeading className={!isMobile ? '!pt-0' : ''} />
      </MovingPanel>
      <GalleryWrapper>
        {quotations.map((quotation) => (
          <QuotationCard
            key={quotation.id}
            id={quotation.id}
            text={quotation.text}
            favoritesList={favoriteIds}
          />
        ))}
      </GalleryWrapper>
    </>
  );
};

export default Quotations;
