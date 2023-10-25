import { useEffect, useState } from 'react';

import useAppSelector from '@/components/hooks/useAppSelector';
import CharacterCard from '@/components/ui/CharacterCard';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import { CharacterType } from '@/constants/enums';

const HeroesGallery = () => {
  // TODO: here I will assign params and manage them for <PageHeading>

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const [filteredHeroes, setFilteredHeroes] = useState(originalHeroes);
  const [paginatedHeroes, setpaginatedHeroes] = useState(originalHeroes);

  // sets filtered after original has loaded
  useEffect(() => {
    setFilteredHeroes(originalHeroes);
    setpaginatedHeroes(originalHeroes);
  }, [originalHeroes]);

  const MappedCharacterCards = () =>
    paginatedHeroes.map((hero) => (
      <CharacterCard
        type={CharacterType.HERO}
        data={hero}
        key={hero.id}
      />
    ));

  return (
    <GalleryWrapper>
      <MappedCharacterCards />
    </GalleryWrapper>
  );
};

export default HeroesGallery;
