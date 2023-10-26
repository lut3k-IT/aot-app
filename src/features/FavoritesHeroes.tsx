import GalleryWrapper from '@/components/ui/GalleryWrapper';
import CharacterCard from '@/components/ui/HeroCard';
import { CharacterType } from '@/constants/enums';

interface FavoritesHeroesProps {}

const FavoritesHeroes = (props: FavoritesHeroesProps) => {
  const {} = props;

  return (
    <GalleryWrapper>
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
    </GalleryWrapper>
  );
};

export default FavoritesHeroes;
