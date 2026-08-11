import { motion } from 'framer-motion';

import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import QuotationCard from '@/components/ui/QuotationCard';
import QuotationCardSkeleton from '@/components/ui/QuotationCardSkeleton';
import { fadeInUp, getStaggerDelay } from '@/constants/motion';
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

  return quotations.map((quotation, index) => (
    <motion.div
      key={quotation.id}
      variants={fadeInUp}
      initial={'hidden'}
      animate={'show'}
      transition={{ delay: getStaggerDelay(index) }}
    >
      <QuotationCard
        id={quotation.id}
        text={quotation.text}
        isFavorite={isInFavorites(quotation.id, favoriteIds)}
      />
    </motion.div>
  ));
};

export default RenderQuotations;
