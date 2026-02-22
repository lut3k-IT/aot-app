import { useMemo } from 'react';

import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { FavoriteType, QuotationType } from '@/constants/types';
import { isInFavorites } from '@/utils/dataHelpers';

interface RenderQuotationsProps {
  quotations: QuotationType[];
  shouldShowFavorites: boolean;
  favoriteIds: FavoriteType[];
  isLoading: boolean;
  hasData: boolean;
}

const RenderQuotations = (props: RenderQuotationsProps) => {
  const { quotations, shouldShowFavorites, favoriteIds, isLoading, hasData } = props;

  if (isLoading) {
    return <MultipleSkeletons skeletonComponent={QuotationCardSkeleton} />;
  }

  const filteredQuotations = useMemo(
    () => quotations.filter((quotation) => !shouldShowFavorites || favoriteIds.includes(quotation.id)),
    [quotations, shouldShowFavorites, favoriteIds]
  );

  if (!hasData || filteredQuotations.length === 0) {
    return <NoResults />;
  }

  return filteredQuotations.map((quotation) => (
    <QuotationCard
      key={quotation.id}
      id={quotation.id}
      text={quotation.text}
      isFavorite={isInFavorites(quotation.id, favoriteIds)}
    />
  ));
};

export default RenderQuotations;
