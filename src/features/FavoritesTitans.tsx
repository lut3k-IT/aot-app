import GalleryWrapper from '@/components/ui/GalleryWrapper';
import CharacterCard from '@/components/ui/HeroCard';
import { CharacterType } from '@/constants/enums';

interface FavoritesTitansProps {}

const FavoritesTitans = (props: FavoritesTitansProps) => {
  const {} = props;

  return (
    <GalleryWrapper>
      <CharacterCard type={CharacterType.TITAN} />
      <CharacterCard type={CharacterType.TITAN} />
      <CharacterCard type={CharacterType.TITAN} />
      <CharacterCard type={CharacterType.TITAN} />
      <CharacterCard type={CharacterType.TITAN} />
      <CharacterCard type={CharacterType.TITAN} />
    </GalleryWrapper>
  );
};

export default FavoritesTitans;
