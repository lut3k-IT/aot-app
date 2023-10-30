import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useAppSelector from '@/components/hooks/useAppSelector';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';
import { filterDestination } from '@/components/ui/PageHeading';

import Filter from './components/Filter';

const PER_PAGE = 30;

const HeroesGallery = () => {
  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const [filteredHeroes, setFilteredHeroes] = useState(originalHeroes);
  const [paginatedHeroes, setpaginatedHeroes] = useState(originalHeroes);

  useEffect(() => {
    setFilteredHeroes(originalHeroes);
    setpaginatedHeroes(originalHeroes);
  }, [originalHeroes]);

  const MappedHeroCards = () =>
    paginatedHeroes.map((hero) => (
      <HeroCard
        data={hero}
        favorites={favoriteHeroesIds}
        key={hero.id}
      />
    ));

  return (
    <GalleryWrapper>
      {filterDestination && createPortal(<Filter />, filterDestination)}
      <MappedHeroCards />
    </GalleryWrapper>
  );
};

export default HeroesGallery;
