import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import useAppSelector from '@/components/hooks/useAppSelector';
import AppHelmet from '@/components/ui/AppHelmet';
import GalleryWrapper from '@/components/ui/GalleryWrapper';
import HeroCard from '@/components/ui/HeroCard';
import { ElementsIds } from '@/constants/enums';

import Filter from './components/Filter';

const PER_PAGE = 30;

const HeroesGallery = () => {
  const { t } = useTranslation();
  // TODO: move filters here, but make a hook from it called useHeroFilterParams
  // FIXME: sometimes it doesn't show
  const filterDestination = document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS);

  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    // filter and paginate
  }, [searchParams]);

  return (
    <GalleryWrapper>
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.gallery')}`} />
      {filterDestination && createPortal(<Filter />, filterDestination)}
      {paginatedHeroes.map((hero) => (
        <HeroCard
          data={hero}
          favorites={favoriteHeroesIds}
          key={hero.id}
        />
      ))}
    </GalleryWrapper>
  );
};

export default HeroesGallery;
