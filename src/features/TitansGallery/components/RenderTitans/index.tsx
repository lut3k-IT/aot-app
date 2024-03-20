import { useMemo } from 'react';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import NoResults from '@/components/ui/NoResults';
import TitanCard from '@/components/ui/TitanCard';
import { CARD_SKELETONS } from '@/constants/constants';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';

interface RenderTitansProps {
  paginatedTitans: TitanType[];
  shouldShowFavorites: boolean;
  favoriteTitansIds: FavoriteType[];
  originalHeroes: HeroType[];
  isLoading: boolean;
  hasData: boolean;
}

// @todo DRY this up
const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <CharacterCardSkeleton key={index} />);

const RenderTitans = (props: RenderTitansProps) => {
  const { paginatedTitans, shouldShowFavorites, favoriteTitansIds, originalHeroes, isLoading, hasData } = props;

  if (isLoading) {
    return <SkeletonCards />;
  }

  const filteredTitansInFunction = useMemo(
    () => paginatedTitans.filter((quotation) => !shouldShowFavorites || favoriteTitansIds.includes(quotation.id)),
    [paginatedTitans, shouldShowFavorites, favoriteTitansIds]
  );

  if (!hasData || filteredTitansInFunction.length === 0) {
    return <NoResults />;
  }

  return filteredTitansInFunction.map((titan) => (
    <TitanCard
      data={titan}
      favorites={favoriteTitansIds}
      heroesData={originalHeroes}
      key={titan.id}
    />
  ));
};

export default RenderTitans;
