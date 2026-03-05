'use client';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import DynamicTitle from '@/components/ui/DynamicTitle';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { selectHeroesData } from '@/store/heroesSlice';
import { addFavorite, removeFavorite, selectTitansData, selectTitansError, selectTitansFavoriteIds } from '@/store/titansSlice';
import { getHeroName, isInFavorites } from '@/utils/dataHelpers';

import DetailsContainer from '../components/DetailsContainer';
import TitanMbtiCard from './components/TitanMbtiCard';
import TitanProfileHeader from './components/TitanProfileHeader';
import TitanStatsGrid from './components/TitanStatsGrid';

interface TitanDetailsProps {
  routeSlug?: string;
}

const TitanDetails = ({ routeSlug }: TitanDetailsProps) => {
  if (!routeSlug) throw new Error('URL is incompatible.');

  const originalTitans = useAppSelector(selectTitansData);
  const originalHeroes = useAppSelector(selectHeroesData);
  const favoriteTitansIds = useAppSelector(selectTitansFavoriteIds);
  const fetchingError = useAppSelector(selectTitansError);
  useApiErrorToast(fetchingError);

  const titan = originalTitans.find((t) => t.slug === routeSlug);
  const isFavorite = titan ? isInFavorites(titan.id, favoriteTitansIds) : false;
  const currentInheritor = titan?.currentInheritor ? getHeroName(titan.currentInheritor, originalHeroes) : '-';
  const formerInheritors =
    titan && titan.formerInheritors.length > 0
      ? titan.formerInheritors.map((f) => getHeroName(f, originalHeroes)).join(', ')
      : '-';

  const mbtiObj = mbti.find((data) => data.id === titan?.mbti);
  const mbtiGroupName: MbtiGroups = mbtiObj ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default';

  const toggleFavorite = useToggleFavorite(isFavorite, titan?.id, addFavorite, removeFavorite);

  if (!titan && originalTitans.length > 0) throw new Error('Titan with this ID does not exist.');
  if (!titan) return;

  return (
    <DetailsContainer>
      <DynamicTitle title={titan.name} />

      <TitanProfileHeader
        titan={titan}
        mbtiGroupName={mbtiGroupName}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <TitanMbtiCard
        mbtiId={titan.mbti}
        mbtiGroupName={mbtiGroupName}
      />

      <TitanStatsGrid
        titan={titan}
        currentInheritor={currentInheritor}
        formerInheritors={formerInheritors}
      />
    </DetailsContainer>
  );
};

export default TitanDetails;
