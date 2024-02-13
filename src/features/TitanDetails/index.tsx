import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import useIsMobile from '@/components/hooks/useIsMobile';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { RoutePath } from '@/constants/enums';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getHeroName, isInFavorites } from '@/utils/dataHelpers';

import ButtonGoBack from '../../components/ui/ButtonGoBack';
import CharacterPicture from '../../components/ui/CharacterPicture';
import DesktopTiles from './components/DesktopTiles';
import MobileTiles from './components/MobileTiles';

const TitanDetails = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

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
  }, [isFavorite, dispatch]);

  if (!titan && originalTitans.length > 0) throw new Error('Titan with this ID does not exist.');
  if (!titan) return;

  return (
    <div
      className={classNames({
        'pt-body-pad-start': isMobile
      })}
    >
      <AppHelmet title={titan.name} />
      <ButtonGoBack fallbackRoute={RoutePath.HEROES_GALLERY} />
      <div className={'relative mt-6 flex flex-col items-center'}>
        <div
          className={classNames('absolute h-[7.5rem] w-full rounded-lg', {
            'bg-neutral-400': mbtiGroupName === 'default',
            'bg-violet-500': mbtiGroupName === 'analysts',
            'bg-emerald-600': mbtiGroupName === 'diplomats',
            'bg-cyan-600': mbtiGroupName === 'sentinels',
            'bg-yellow-400': mbtiGroupName === 'explorers'
          })}
        />
        <CharacterPicture
          imgSource={`/assets/img/titans/${paramTitanId}.jpg`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'mt-2 w-full text-center text-2xl font-medium'}>{titan.name}</div>
      {isMobile ? (
        <MobileTiles
          titan={titan}
          currentInheritor={currentInheritor}
          formerInheritors={formerInheritors}
        />
      ) : (
        <DesktopTiles
          titan={titan}
          currentInheritor={currentInheritor}
          formerInheritors={formerInheritors}
        />
      )}{' '}
      <FavoriteButton
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default TitanDetails;
