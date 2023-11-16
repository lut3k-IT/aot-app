import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { v4 } from 'uuid';

import useAppSelector from '@/components/hooks/useAppSelector';
import { Button } from '@/components/ui/Button';
import HeroStatus from '@/components/ui/HeroStatus';
import { RoutePath } from '@/constants/enums';
import {
  getMbtiGroupName,
  getMbtiShortName,
  getResidenceName,
  getSpeciesName,
  getStatusName,
  isInFavorites
} from '@/utils/dataHelpers';

import ButtonGoBack from '../../components/ui/ButtonGoBack';
import CharacterPicture from '../../components/ui/CharacterPicture';

interface GridRowProps {
  title: string;
  value?: React.ReactNode;
}

const GridRow = (props: GridRowProps) => {
  const { title, value = '-' } = props;

  return (
    <>
      <div
        className={
          'w-full bg-muted text-muted-foreground text-md uppercase px-2 py-0.5 rounded-md text-center font-bold'
        }
      >
        {title}
      </div>
      <div className={'w-full self-center text-lg -mt-0.5'}>{value}</div>
    </>
  );
};

const HeroDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  if (!id) throw new Error('TODO: write error');
  if (isNaN(Number(id))) throw new Error('TODO:');

  const paramHeroId = +id;

  const originalHeroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  const hero = originalHeroes.find((hero) => hero.id === paramHeroId);
  const isFavorite = isInFavorites(paramHeroId, favoriteHeroesIds);

  // TODO: if there is no hero, show something

  if (!hero) return <div>no hero</div>;

  return (
    <div className={'pt-body-pad-start'}>
      <ButtonGoBack fallbackRoute={RoutePath.HEROES_GALLERY} />
      <div className={'flex flex-col items-center mt-6 relative'}>
        <div
          className={classNames('absolute w-full h-[120px] bg-violet-400 rounded-lg', {
            '': getMbtiGroupName(hero.mbti, t) === ''
          })}
        />
        <CharacterPicture
          imgSource={`/assets/img/heroes/${paramHeroId}.jpg`}
          size={'xl'}
          variant={'circle'}
          className={'mt-5 border-4 border-background'}
        />
      </div>
      <div className={'w-full text-center mt-2 font-semibold text-2xl'}>{`${hero.firstName} ${
        hero?.lastName || ''
      }`}</div>
      <div className={'grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] mt-6 gap-x-4 gap-y-3 items-start'}>
        <GridRow
          title={t('data:species.title')}
          value={getSpeciesName(hero.species, t) || '-'}
        />
        <GridRow
          title={t('data:residence.title')}
          value={getResidenceName(hero.residence, t) || '-'}
        />
        <GridRow
          title={t('data:status.title')}
          value={
            <HeroStatus
              statusId={hero.status}
              className={'font-semibold'}
            />
          }
        />
        <GridRow
          title={t('data:mbti.title')}
          value={getMbtiShortName(hero.mbti) || '-'}
        />
        <GridRow
          title={t('data:age.title')}
          value={hero.age || '-'}
        />
        <GridRow
          title={t('data:height.title')}
          value={hero.height ? `${hero.height} cm` : '-'}
        />
        <GridRow
          title={t('data:weight.title')}
          value={hero.height ? `${hero.weight} kg` : '-'}
        />
      </div>
      <div className={'flex-center'}>
        <Button
          className={'mt-8 w-full max-w-[500px]'}
          iconName={'heart'}
          variant={isFavorite ? 'secondary' : 'default'}
          iconProps={{ isFilled: isFavorite, className: isFavorite ? 'text-red-500 fill-red-500' : '' }}
        >
          {isFavorite ? t('common:action.removeFromFavorites') : t('common:action.addToFavorites')}
        </Button>
      </div>
    </div>
  );
};

export default HeroDetails;
