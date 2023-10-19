import GalleryWrapper from '@/components/ui/GalleryWrapper';
import QuotationCard from '@/components/ui/QuotationCard';

interface FavoritesQuotationsProps {}

const FavoritesQuotations = (props: FavoritesQuotationsProps) => {
  const {} = props;

  return (
    <GalleryWrapper>
      <QuotationCard />
      <QuotationCard />
      <QuotationCard />
      <QuotationCard />
      <QuotationCard />
      <QuotationCard />
      <QuotationCard />
    </GalleryWrapper>
  );
};

export default FavoritesQuotations;
