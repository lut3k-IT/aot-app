'use client';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { addFavorite, removeFavorite, selectHeroesData, selectHeroesError, selectHeroesFavoriteIds } from '@/store/heroesSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import DetailsContainer from '../components/DetailsContainer';
import HeroMbtiCard from './components/HeroMbtiCard';
import HeroProfileHeader from './components/HeroProfileHeader';
import HeroStatsGrid from './components/HeroStatsGrid';

interface HeroDetailsProps {
  routeSlug?: string;
}

const HeroDetails = ({ routeSlug }: HeroDetailsProps) => {
  if (!routeSlug) throw new Error('URL is incompatible.');

  const originalHeroes = useAppSelector(selectHeroesData);
  const favoriteHeroesIds = useAppSelector(selectHeroesFavoriteIds);
  const fetchingError = useAppSelector(selectHeroesError);
  useApiErrorToast(fetchingError);

  const hero = originalHeroes.find((h) => h.slug === routeSlug);
  const isFavorite = hero ? isInFavorites(hero.id, favoriteHeroesIds) : false;

  const mbtiObj = mbti.find((data) => data.id === hero?.mbti);
  const mbtiGroupName: MbtiGroups = mbtiObj ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default';

  const toggleFavorite = useToggleFavorite(isFavorite, hero?.id, addFavorite, removeFavorite);

  if (!hero && originalHeroes.length > 0) throw new Error('Hero with this ID does not exist.');
  if (!hero) return;

  return (
    <DetailsContainer>
      <DynamicTitle title={`${hero.firstName} ${hero.lastName || ''}`} />

      {/* Full-width profile header (cover + avatar + name + aliases) */}
      <HeroProfileHeader
        hero={hero}
        mbtiGroupName={mbtiGroupName}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <HeroMbtiCard
        mbtiId={hero.mbti}
        mbtiGroupName={mbtiGroupName}
      />
      <HeroStatsGrid hero={hero} />
    </DetailsContainer>
  );
};

export default HeroDetails;
