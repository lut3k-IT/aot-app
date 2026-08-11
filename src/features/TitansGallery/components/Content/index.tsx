import { useMemo } from 'react';
import { motion } from 'framer-motion';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import TitanCard from '@/components/ui/TitanCard';
import { fadeInUp, getStaggerDelay } from '@/constants/motion';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';
import { isInFavorites } from '@/utils/dataHelpers';

interface ContentProps {
  titans: TitanType[];
  favoriteTitansIds: FavoriteType[];
  originalHeroes: HeroType[];
  isLoading: boolean;
  hasData: boolean;
  hasDataToShow: boolean;
}

const Content = (props: ContentProps) => {
  const { titans, favoriteTitansIds, originalHeroes, isLoading, hasData, hasDataToShow } = props;

  const heroesMap = useMemo(() => {
    const map = new Map<number, string>();
    originalHeroes.forEach((hero) => {
      map.set(hero.id, `${hero.firstName || ''} ${hero.lastName || ''}`);
    });
    return map;
  }, [originalHeroes]);

  if (isLoading) {
    return <MultipleSkeletons skeletonComponent={CharacterCardSkeleton} />;
  }

  if (!hasData || !hasDataToShow) {
    return <NoResults />;
  }

  return titans.map((titan, index) => (
    <motion.div
      key={titan.id}
      variants={fadeInUp}
      initial={'hidden'}
      animate={'show'}
      transition={{ delay: getStaggerDelay(index) }}
    >
      <TitanCard
        data={titan}
        isFavorite={isInFavorites(titan.id, favoriteTitansIds)}
        currentInheritorName={(titan.currentInheritor !== null && heroesMap.get(titan.currentInheritor)) || ' '}
      />
    </motion.div>
  ));
};

export default Content;
