import GalleryWrapper from '@/components/ui/GalleryWrapper';
import TitanCard from '@/components/ui/TitanCard';

interface FavoritesTitansProps {}

const FavoritesTitans = (props: FavoritesTitansProps) => {
  const {} = props;

  return (
    <GalleryWrapper>
      <TitanCard />
      <TitanCard />
      <TitanCard />
      <TitanCard />
      <TitanCard />
      <TitanCard />
    </GalleryWrapper>
  );
};

export default FavoritesTitans;
