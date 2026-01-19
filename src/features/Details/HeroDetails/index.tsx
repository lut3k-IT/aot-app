'use client';

import { useTranslation } from 'react-i18next';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import CharacterPicture from '@/components/ui/CharacterPicture';
import DynamicTitle from '@/components/ui/DynamicTitle';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { RoutePath } from '@/constants/enums';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { isInFavorites } from '@/utils/dataHelpers';

import DetailsContainer from '../components/DetailsContainer';
import MBTIBar from '../components/MBTIBar';
import Tiles from './components/Tiles';

interface HeroDetailsProps {
  routeSlug?: string;
}

const HeroDetails = ({ routeSlug }: HeroDetailsProps) => {
  const { t } = useTranslation();

  if (!routeSlug) throw new Error('URL is incompatible.');

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingError = useAppSelector((state) => state.heroes.error);
  useApiErrorToast(fetchingError);

  const hero = originalHeroes.find((hero) => hero.slug === routeSlug);
  const isFavorite = hero ? isInFavorites(hero.id, favoriteHeroesIds) : false;

  const mbtiObj = mbti.find((data) => data.id === hero?.mbti);
  const mbtiGroupName: MbtiGroups = mbtiObj ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default';

  const toggleFavorite = useToggleFavorite(isFavorite, hero?.id, addFavorite, removeFavorite);

  if (!hero && originalHeroes.length > 0) throw new Error('Hero with this ID does not exist.');
  if (!hero) return;

  return (
    <DetailsContainer>
      <DynamicTitle title={`${hero.firstName} ${hero.lastName || ''}`} />
      <ButtonGoBack
        fallbackRoute={RoutePath.HEROES_GALLERY}
        aria-label={t('common:navigation.goBack')}
      />
      <div className={'details-profile-wrapper'}>
        <MBTIBar mbtiGroupName={mbtiGroupName} />
        <CharacterPicture
          imgSource={`/assets/img/heroes/${hero.slug}.jpg`}
          alt={`${hero.firstName} ${hero.lastName} - Attack on Titan ${t('common:brand')}`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'details-character-name'}>{`${hero.firstName} ${hero?.lastName || ''}`}</div>
      <Tiles hero={hero} />
      <FavoriteButton
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </DetailsContainer>
  );
};

export default HeroDetails;
