import { motion } from 'framer-motion';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import HeroCard from '@/components/ui/HeroCard';
import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import { fadeInUp, getStaggerDelay } from '@/constants/motion';
import { FavoriteType, HeroType } from '@/constants/types';
import { isInFavorites } from '@/utils/dataHelpers';

interface ContentProps {
  hasData: boolean;
  hasDataToShow: boolean;
  isLoading: boolean;
  paginatedHeroes: HeroType[];
  favoriteHeroesIds: FavoriteType[];
}

const Content = (props: ContentProps) => {
  const { hasData, isLoading, hasDataToShow, paginatedHeroes, favoriteHeroesIds } = props;

  if (isLoading) {
    return <MultipleSkeletons skeletonComponent={CharacterCardSkeleton} />;
  }

  if (!hasData || !hasDataToShow) {
    return <NoResults />;
  }

  return paginatedHeroes.map((hero, index) => (
    <motion.div
      key={hero.id}
      variants={fadeInUp}
      initial={'hidden'}
      animate={'show'}
      transition={{ delay: getStaggerDelay(index) }}
    >
      <HeroCard
        data={hero}
        isFavorite={isInFavorites(hero.id, favoriteHeroesIds)}
      />
    </motion.div>
  ));
};

export default Content;
