import CharacterCard from '@/components/ui/CharacterCard';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
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
