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
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getHeroName, isInFavorites } from '@/utils/dataHelpers';

import DetailsContainer from '../components/DetailsContainer';
import MBTIBar from '../components/MBTIBar';
import Tiles from './components/Tiles';

const TitanDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();

  const paramTitanId = useValidateIdFromParam(id);

  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.titans.status);
  const fetchingError = useAppSelector((state) => state.titans.error);

  const titan = originalTitans.find((titan) => titan.id === paramTitanId);
  const isFavorite = isInFavorites(paramTitanId, favoriteTitansIds);
  const currentInheritor = titan?.currentInheritor ? getHeroName(titan.currentInheritor, originalHeroes) : '-';
  const formerInheritors =
    titan && titan.formerInheritors.length > 0
      ? titan.formerInheritors.map((f) => getHeroName(f, originalHeroes)).join(', ')
      : '-';

  const mbtiObj = mbti.find((data) => data.id === titan?.mbti);
  const mbtiGroupName: MbtiGroups = mbtiObj ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default';

  const handleToggleFavorite = useCallback(() => {
    const action = isFavorite ? removeFavorite : addFavorite;
    dispatch(action(paramTitanId));
    toast({
      title: isFavorite ? t('notifications:common.removedFromFavorites') : t('notifications:common.addedToFavorites')
    });
  }, [isFavorite, dispatch]);

  if (!titan && originalTitans.length > 0) throw new Error('Titan with this ID does not exist.');
  if (!titan) return;

  return (
    <DetailsContainer>
      <AppHelmet
        title={titan.name}
        description={`${titan.name} - ${t('common:brand')}`}
      />
      <ButtonGoBack
        fallbackRoute={RoutePath.TITANS}
        aria-label={t('common:navigation.goBack')}
      />
      <div className={'details-profile-wrapper'}>
        <MBTIBar mbtiGroupName={mbtiGroupName} />
        <CharacterPicture
          imgSource={`/assets/img/titans/${paramTitanId}.jpg`}
          alt={`${titan.name} - ${t('common:brand')}`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'details-character-name'}>{titan.name}</div>
      <Tiles
        titan={titan}
        currentInheritor={currentInheritor}
        formerInheritors={formerInheritors}
      />
      <FavoriteButton
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
    </DetailsContainer>
  );
};

export default TitanDetails;
