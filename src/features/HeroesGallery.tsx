import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useAppSelector from '@/components/hooks/useAppSelector';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';

const PER_PAGE = 30;

const HeroesGallery = () => {
  // TODO: here I will assign params and manage them for <PageHeading>

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const [filteredHeroes, setFilteredHeroes] = useState(originalHeroes);
  const [paginatedHeroes, setpaginatedHeroes] = useState(originalHeroes.slice(0, PER_PAGE));

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setFilteredHeroes(originalHeroes);
    setpaginatedHeroes(originalHeroes.slice(0, PER_PAGE));
    setHasMore(true);
  }, [originalHeroes]);

  const fetchData = () => {
    if (paginatedHeroes.length >= filteredHeroes.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setpaginatedHeroes(
        paginatedHeroes.concat(filteredHeroes.slice(paginatedHeroes.length, paginatedHeroes.length + PER_PAGE))
      );
    }, 400);
  };

  const MappedHeroCards = () =>
    paginatedHeroes.map((hero) => (
      <HeroCard
        data={hero}
        key={hero.id}
      />
    ));

  return (
    <InfiniteScroll
      dataLength={paginatedHeroes.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more heroes</p>}
    >
      <GalleryWrapper>
        <MappedHeroCards />
      </GalleryWrapper>
    </InfiniteScroll>
  );
};

export default HeroesGallery;
