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

const cnContainer = 'flex gap-4 h-[108px]';
const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-semibold leading-none';

const TitanCard = (props: TitanCardProps) => {
  const { data, favorites, heroesData } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();
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
        <MbtiFrame
          mbtiId={data.mbti}
          onClick={() => navigate(`${RoutePath.TITAN_DETAILS}/${data.id}`)}
        >
          <CharacterPicture
            imgSource={`/assets/img/titans/${data.id}.jpg`}
            variant={'roundedBtm'}
          />
        </MbtiFrame>
      </Link>
      <div className={'flex flex-col flex-1 justify-between'}>
        <div className={'w-full flex flex-col gap-1 mt-0.5 relative'}>
          <div className={'text-lg leading-none font-medium pr-10'}>{data.name || ''}</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10 capitalize'}>
            {currentInheritor}
          </div>
          <HeartButton
            className={'absolute top-0 right-0'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'flex items-center justify-center px-4 gap-8 w-full h-[52px] bg-accent rounded-md'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default TitanCard;
