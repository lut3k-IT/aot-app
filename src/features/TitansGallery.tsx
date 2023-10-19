import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import TitanCard from '@/components/ui/TitanCard';

const TitansGallery = () => {
  return (
    <>
      <MovingPanel>
        <PageHeading />
      </MovingPanel>
      <GalleryWrapper>
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
        <TitanCard />
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
