import { useMemo } from 'react';

import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { FavoriteType, QuotationType } from '@/constants/types';

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

  const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const filteredQuotations = useMemo(
    () => quotations.filter((quotation) => !shouldShowFavorites || favoriteIdsSet.has(quotation.id)),
    [quotations, shouldShowFavorites, favoriteIdsSet]
  );

  if (!hasData || filteredQuotations.length === 0) {
    return <NoResults />;
  }

  return filteredQuotations.map((quotation) => (
    <QuotationCard
      key={quotation.id}
      id={quotation.id}
      text={quotation.text}
      favoritesList={favoriteIds}
    />
  ));
};

export default RenderQuotations;
