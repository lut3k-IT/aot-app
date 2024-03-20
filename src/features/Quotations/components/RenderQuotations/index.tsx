import { useMemo } from 'react';

import NoResults from '@/components/ui/NoResults';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { CARD_SKELETONS } from '@/constants/constants';
import { FavoriteType, QuotationType } from '@/constants/types';

interface RenderQuotationsProps {
  quotations: QuotationType[];
  shouldShowFavorites: boolean;
  favoriteIds: FavoriteType[];
  isLoading: boolean;
  hasData: boolean;
}

// @todo DRY this up
const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <QuotationCardSkeleton key={index} />);

// @todo DRY this up
const RenderQuotations = (props: RenderQuotationsProps) => {
  const { quotations, shouldShowFavorites, favoriteIds, isLoading, hasData } = props;

  if (isLoading) {
    return <SkeletonCards />;
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
      favoritesList={favoriteIds}
    />
  ));
};

export default RenderQuotations;
