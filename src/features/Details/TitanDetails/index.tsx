import { useTranslation } from 'react-i18next';

import { useApiErrorToast } from '@/components/hooks/useApiErrorToast';
import useAppSelector from '@/components/hooks/useAppSelector';
import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
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

interface TitanDetailsProps {
  routeId?: string;
}

const TitanDetails = ({ routeId }: TitanDetailsProps) => {
  const { t } = useTranslation();

  const paramTitanId = useValidateIdFromParam(routeId);

  const originalTitans = useAppSelector((state) => state.titans.data);
  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteTitansIds = useAppSelector((state) => state.titans.favoriteIds);
  const fetchingError = useAppSelector((state) => state.titans.error);
  useApiErrorToast(fetchingError);

  const titan = originalTitans.find((titan) => titan.id === paramTitanId);
  const isFavorite = isInFavorites(paramTitanId, favoriteTitansIds);
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
      <AppHelmet
        title={titan.name}
        description={`${titan.name} - Attack on Titan ${t('common:brand')}`}
      />
      <ButtonGoBack
        fallbackRoute={RoutePath.TITANS}
        aria-label={t('common:navigation.goBack')}
      />
      <div className={'details-profile-wrapper'}>
        <MBTIBar mbtiGroupName={mbtiGroupName} />
        <CharacterPicture
          imgSource={`/assets/img/titans/${paramTitanId}.jpg`}
          alt={`${titan.name} - Attack on Titan ${t('common:brand')}`}
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
        onToggleFavorite={toggleFavorite}
      />
    </DetailsContainer>
  );
};

export default TitanDetails;
