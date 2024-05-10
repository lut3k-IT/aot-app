import CharacterCardSkeleton from '@/components/ui/CharacterCardSkeleton';
import HeroCard from '@/components/ui/HeroCard';
import NoResults from '@/components/ui/NoResults';
import { CARD_SKELETONS } from '@/constants/constants';
import { FavoriteType, HeroType } from '@/constants/types';

interface ContentProps {
  hasData: boolean;
  hasDataToShow: boolean;
  isLoading: boolean;
  paginatedHeroes: HeroType[];
  favoriteHeroesIds: FavoriteType[];
}

const SkeletonCards = () => Array.from({ length: CARD_SKELETONS }, (_, index) => <CharacterCardSkeleton key={index} />);

const Content = (props: ContentProps) => {
  const { hasData, isLoading, hasDataToShow, paginatedHeroes, favoriteHeroesIds } = props;

  if (isLoading) {
    return <SkeletonCards />;
  }

  if (!hasData || !hasDataToShow) {
    return <NoResults />;
  }

  return paginatedHeroes.map((hero) => (
    <HeroCard
      data={hero}
      favorites={favoriteHeroesIds}
      key={hero.id}
    />
  ));
};

export default Content;
