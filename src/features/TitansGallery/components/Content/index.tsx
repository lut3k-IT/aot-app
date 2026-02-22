import { useMemo } from 'react';

import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import MultipleSkeletons from '@/components/ui/MultipleSkeletons';
import NoResults from '@/components/ui/NoResults';
import TitanCard from '@/components/ui/TitanCard';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';
import { isInFavorites } from '@/utils/dataHelpers';

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

  const heroesMap = useMemo(() => {
    const map = new Map<number, string>();
    originalHeroes.forEach((hero) => {
      map.set(hero.id, `${hero.firstName || ''} ${hero.lastName || ''}`);
    });
    return map;
  }, [originalHeroes]);

  if (!hasData || filteredAndFavoriteTitans.length === 0) {
    return <NoResults />;
  }

  return filteredAndFavoriteTitans.map((titan) => (
    <TitanCard
      data={titan}
      isFavorite={isInFavorites(titan.id, favoriteTitansIds)}
      currentInheritorName={
        (titan.currentInheritor !== null && heroesMap.get(titan.currentInheritor)) || ' '
      }
      key={titan.id}
    />
  ));
};

export default Content;
