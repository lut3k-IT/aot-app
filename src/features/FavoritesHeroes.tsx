import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';

interface FavoritesHeroesProps {}

const FavoritesHeroes = (props: FavoritesHeroesProps) => {
  const {} = props;

  return (
    <GalleryWrapper>
      <HeroCard />
      <HeroCard />
      <HeroCard />
      <HeroCard />
      <HeroCard />
      <HeroCard />
    </GalleryWrapper>
  );
};

export default FavoritesHeroes;
