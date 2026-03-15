import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { FavoriteType, QuotationType } from '@/constants/types';
import { isInFavorites } from '@/utils/dataHelpers';

interface RenderQuotationsProps {
  quotations: QuotationType[];
  favoriteIds: FavoriteType[];
  isLoading: boolean;
  hasData: boolean;
  hasDataToShow: boolean;
}

const RenderQuotations = (props: RenderQuotationsProps) => {
  const { quotations, favoriteIds, isLoading, hasData, hasDataToShow } = props;

  if (isLoading) {
    return <MultipleSkeletons skeletonComponent={QuotationCardSkeleton} />;
  }

  if (!hasData || !hasDataToShow) {
    return <NoResults />;
  }

  return quotations.map((quotation) => (
    <QuotationCard
      key={quotation.id}
      id={quotation.id}
      text={quotation.text}
      isFavorite={isInFavorites(quotation.id, favoriteIds)}
    />
  ));
};

export default RenderQuotations;
