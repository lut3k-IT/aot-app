import { useEffect, useState } from 'react';

import useAppSelector from '@/components/hooks/useAppSelector';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import TitanCard from '@/components/ui/TitanCard';

const TitansGallery = () => {
  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);

  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.titans.status);
  const fetchingError = useAppSelector((state) => state.titans.error);

  const [filteredTitans, setFilteredTitans] = useState(originalTitans);
  const [paginatedTitans, setPaginatedTitans] = useState(originalTitans);

  useEffect(() => {
    setFilteredTitans(originalTitans);
    setPaginatedTitans(originalTitans);
  }, [originalTitans]);

  const MappedCharacterCards = () =>
    paginatedTitans.map((titan) => (
      <TitanCard
        data={titan}
        favorites={favoriteTitansIds}
        heroesData={originalHeroes}
        key={titan.id}
      />
    ));

  return (
    <>
      <MovingPanel>
        <PageHeading />
      </MovingPanel>
      <GalleryWrapper>
        <MappedCharacterCards />
      </GalleryWrapper>
    </>
  );
};

export default TitansGallery;
