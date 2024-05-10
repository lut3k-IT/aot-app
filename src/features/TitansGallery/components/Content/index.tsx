import { useMemo } from 'react';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import NoResults from '@/components/ui/NoResults';
import TitanCard from '@/components/ui/TitanCard';
import { CARD_SKELETONS } from '@/constants/constants';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';

interface ContentProps {
  paginatedTitans: TitanType[];
  shouldShowFavorites: boolean;
  favoriteTitansIds: FavoriteType[];
  originalHeroes: HeroType[];
  isLoading: boolean;
  hasData: boolean;
}

const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <CharacterCardSkeleton key={index} />);

const Content = (props: ContentProps) => {
  const { paginatedTitans, shouldShowFavorites, favoriteTitansIds, originalHeroes, isLoading, hasData } = props;

  if (isLoading) {
    return <SkeletonCards />;
  }

  const filteredAndFavoriteTitans = useMemo(
    () => paginatedTitans.filter((titan) => !shouldShowFavorites || favoriteTitansIds.includes(titan.id)),
    [paginatedTitans, shouldShowFavorites, favoriteTitansIds]
  );

  if (!hasData || filteredAndFavoriteTitans.length === 0) {
    return <NoResults />;
  }

  return filteredAndFavoriteTitans.map((titan) => (
    <TitanCard
      data={titan}
      favorites={favoriteTitansIds}
      heroesData={originalHeroes}
      key={titan.id}
    />
  ));
};

export default Content;
