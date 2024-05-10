import { useMemo } from 'react';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import TitanCard from '@/components/ui/TitanCard';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';

interface ContentProps {
  paginatedTitans: TitanType[];
  shouldShowFavorites: boolean;
  favoriteTitansIds: FavoriteType[];
  originalHeroes: HeroType[];
  isLoading: boolean;
  hasData: boolean;
}

const Content = (props: ContentProps) => {
  const { paginatedTitans, shouldShowFavorites, favoriteTitansIds, originalHeroes, isLoading, hasData } = props;

  if (isLoading) {
    return <MultipleSkeletons skeletonComponent={CharacterCardSkeleton} />;
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
