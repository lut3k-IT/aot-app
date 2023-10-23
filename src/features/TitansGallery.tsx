import CharacterCard from '@/components/ui/CharacterCard';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { CharacterType } from '@/constants';

const TitansGallery = () => {
  return (
    <>
      <MovingPanel>
        <PageHeading />
      </MovingPanel>
      <GalleryWrapper>
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
        <CharacterCard type={CharacterType.TITAN} />
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
