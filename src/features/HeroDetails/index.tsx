import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import useValidateIdFromParam from '@/components/hooks/useValidateIdFromParam';
import AppHelmet from '@/components/ui/AppHelmet';
import { Button } from '@/components/ui/Button';
import HeroStatus from '@/components/ui/HeroStatus';
import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { RoutePath } from '@/constants/enums';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { getMbtiShortName, getResidenceName, getSpeciesName, isInFavorites } from '@/utils/dataHelpers';

import ButtonGoBack from '../../components/ui/ButtonGoBack';
import CharacterPicture from '../../components/ui/CharacterPicture';
import { DetailsGridRow } from '../../components/ui/DetailsGridRow';

const HeroDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
  }, [isFavorite, dispatch]);

  if (!hero && originalHeroes.length > 0) throw new Error('Hero with this ID does not exist.');
  if (!hero) return;

  return (
    <div className={'pt-body-pad-start'}>
      <AppHelmet title={`${hero.firstName} ${hero.lastName || ''}`} />
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
          imgSource={`/assets/img/heroes/${paramHeroId}.jpg`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'mt-2 w-full text-center text-2xl font-medium'}>{`${hero.firstName} ${
        hero?.lastName || ''
      }`}</div>
      <div className={'mt-6 grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] items-start gap-x-4 gap-y-3'}>
        <DetailsGridRow
          title={t('data:species.title')}
          value={getSpeciesName(hero.species, t) || '-'}
        />
        <DetailsGridRow
          title={t('data:residence.title')}
          value={getResidenceName(hero.residence, t) || '-'}
        />
        <DetailsGridRow
          title={t('data:status.title')}
          value={
            <HeroStatus
              statusId={hero.status}
              className={'font-medium'}
            />
          }
        />
        <DetailsGridRow
          title={t('data:mbti.title')}
          value={getMbtiShortName(hero.mbti) || '-'}
        />
        <DetailsGridRow
          title={t('data:age.title')}
          value={hero.age || '-'}
        />
        <DetailsGridRow
          title={t('data:height.title')}
          value={hero.height ? `${hero.height} cm` : '-'}
        />
        <DetailsGridRow
          title={t('data:weight.title')}
          value={hero.height ? `${hero.weight} kg` : '-'}
        />
      </div>
      <div className={'flex-center'}>
        <Button
          className={'mt-8 w-full max-w-[31.25rem]'}
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

export default HeroDetails;
