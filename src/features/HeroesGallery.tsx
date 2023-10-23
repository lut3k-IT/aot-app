import CharacterCard from '@/components/ui/CharacterCard';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import { CharacterType } from '@/constants';

const HeroesGallery = () => {
  // TODO: here I will assign params and manage them for <PageHeading>

  return (
    <GalleryWrapper>
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
      <CharacterCard type={CharacterType.HERO} />
    </GalleryWrapper>
  );
};

export default HeroesGallery;
