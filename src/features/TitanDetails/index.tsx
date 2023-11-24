import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import { Button } from '@/components/ui/Button';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { RoutePath } from '@/constants/enums';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getAllegianceNames, getHeroName, getMbtiShortName, isInFavorites } from '@/utils/dataHelpers';

import ButtonGoBack from '../../components/ui/ButtonGoBack';
import CharacterPicture from '../../components/ui/CharacterPicture';
import { DetailsGridRow } from '../../components/ui/DetailsGridRow';

const TitanDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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

  // fixme: buttongoback works only after second click — maybe history is duplicated?

  return (
    <div className={'pt-body-pad-start'}>
      <AppHelmet title={titan.name} />
      <ButtonGoBack fallbackRoute={RoutePath.HEROES_GALLERY} />
      <div className={'relative mt-6 flex flex-col items-center'}>
        <div
          className={classNames('absolute h-[120px] w-full rounded-lg', {
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
      <div className={'mt-2 w-full text-center text-2xl font-semibold'}>{titan.name}</div>
      <div className={'mt-6 grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] items-start gap-x-4 gap-y-3'}>
        <DetailsGridRow
          title={t('data:mbti.title')}
          value={getMbtiShortName(titan.mbti)}
        />
        <DetailsGridRow
          title={t('data:height.title')}
          value={`${titan.height} cm`}
        />
        <DetailsGridRow
          title={t('data:allegiance.title')}
          value={getAllegianceNames(titan.allegiance, t).join(', ')}
        />
        <DetailsGridRow
          title={t('data:currentInheritor')}
          value={currentInheritor}
        />
        <DetailsGridRow
          title={t('data:formerInheritors')}
          value={formerInheritors}
        />
        <DetailsGridRow
          title={t('data:otherNames')}
          value={titan.otherNames.join(', ')}
        />
        <DetailsGridRow
          title={t('data:abilities')}
          value={titan.abilities.join(', ')}
        />
      </div>
      <div className={'flex-center'}>
        <Button
          className={'mt-8 w-full max-w-[500px]'}
          iconName={'heart'}
          variant={isFavorite ? 'secondary' : 'default'}
          iconProps={{ isFilled: isFavorite, className: isFavorite ? 'text-red-500 fill-red-500' : '' }}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
        </Button>
      </div>
    </div>
  );
};

export default TitanDetails;
