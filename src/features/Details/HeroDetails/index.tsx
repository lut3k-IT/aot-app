import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToast } from '@/components/hooks/useToast';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import ButtonGoBack from '@/components/ui/ButtonGoBack';
import CharacterPicture from '@/components/ui/CharacterPicture';
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

const HeroDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();

  const paramHeroId = useValidateIdFromParam(id);

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const hero = originalHeroes.find((hero) => hero.id === paramHeroId);
  const isFavorite = isInFavorites(paramHeroId, favoriteHeroesIds);

  const mbtiObj = mbti.find((data) => data.id === hero?.mbti);
  const mbtiGroupName: MbtiGroups = mbtiObj ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default';

  const handleToggleFavorite = useCallback(() => {
    const action = isFavorite ? removeFavorite : addFavorite;
    dispatch(action(paramHeroId));
    toast({
      title: isFavorite ? t('notifications:common.removedFromFavorites') : t('notifications:common.addedToFavorites')
    });
  }, [isFavorite, dispatch]);

  if (!hero && originalHeroes.length > 0) throw new Error('Hero with this ID does not exist.');
  if (!hero) return;

  return (
    <DetailsContainer>
      <AppHelmet
        title={`${hero.firstName} ${hero.lastName || ''}`}
        description={`${hero.firstName} ${hero.lastName || ''} - ${t('common:brand')}`}
      />
      <ButtonGoBack
        fallbackRoute={RoutePath.HEROES_GALLERY}
        aria-label={t('common:navigation.goBack')}
      />
      <div className={'details-profile-wrapper'}>
        <MBTIBar mbtiGroupName={mbtiGroupName} />
        <CharacterPicture
          imgSource={`/assets/img/heroes/${paramHeroId}.jpg`}
          alt={`${hero.firstName} - ${t('common:brand')}`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'details-character-name'}>{`${hero.firstName} ${hero?.lastName || ''}`}</div>
      <Tiles hero={hero} />
      <FavoriteButton
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
    </DetailsContainer>
  );
};

export default HeroDetails;