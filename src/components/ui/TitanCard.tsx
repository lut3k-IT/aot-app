import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getAllegianceNames, getHeroName, isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import MbtiFrame from './MbtiFrame';

interface TitanCardProps {
  data: TitanType;
  favorites: FavoriteType[];
  heroesData: HeroType[];
}

const cnContainer = 'flex gap-4 h-27';
const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-semibold leading-none';

const TitanCard = (props: TitanCardProps) => {
  const { data, favorites, heroesData } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentInheritor = getHeroName(data.currentInheritor, heroesData);
  const allegianceNames = getAllegianceNames(data.allegiance, t);
  const isCurrentFavorite = isInFavorites(data.id, favorites);

  const visibleDetails = [
    {
      title: t('data:height.title'),
      value: data.height
    },
    {
      title: t('data:allegiance.title'),
      value: allegianceNames[0]
    }
  ];

  const handleToggleFavorite = useCallback(() => {
    const action = isCurrentFavorite ? removeFavorite : addFavorite;
    dispatch(action(data.id));
  }, [data, favorites, dispatch]);

  const DetailsBoxes = () =>
    visibleDetails.map((detail) => (
      <div
        className={cnDetailBox}
        key={v4()}
      >
        <div className={cnDetailTitle}>{detail.title}</div>
        <div className={cnDetailValue}>{detail.value || '-'}</div>
      </div>
    ));

  return (
    <div className={cnContainer}>
      <Link
        to={`${RoutePath.TITAN_DETAILS}/${data.id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={data.mbti}>
          <CharacterPicture
            imgSource={`/assets/img/titans/${data.id}.jpg`}
            variant={'roundedBtm'}
          />
        </MbtiFrame>
      </Link>
      <div className={'flex flex-1 flex-col justify-between'}>
        <div className={'relative mt-0.5 flex w-full flex-col gap-1'}>
          <div className={'pr-10 text-lg font-medium leading-none'}>{data.name || ''}</div>
          <div className={'pr-10 text-sm font-medium capitalize leading-none text-muted-foreground'}>
            {currentInheritor}
          </div>
          <HeartButton
            className={'absolute right-0 top-0'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'h-13 flex w-full items-center justify-center gap-8 rounded-md bg-accent px-4'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default TitanCard;
