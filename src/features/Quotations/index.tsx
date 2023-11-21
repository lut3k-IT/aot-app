import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import QuotationCard from '@/components/ui/QuotationCard';

const Quotations = () => {
  const { t } = useTranslation();

  const quotations = useAppSelector((state) => state.quotations.data);
  const favoriteIds = useAppSelector((state) => state.quotations.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.quotations.status);
  const fetchingError = useAppSelector((state) => state.quotations.error);

  return (
    <>
      <MovingPanel>
        <PageHeading />
      </MovingPanel>
      <AppHelmet title={`${t('common:title.quotations')} ${t('common:tab.gallery')}`} />
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
