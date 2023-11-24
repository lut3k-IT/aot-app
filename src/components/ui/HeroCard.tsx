import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { RoutePath } from '@/constants/enums';
import { FavoriteType, HeroType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { getResidenceName, isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import HeroStatus from './HeroStatus';
import MbtiFrame from './MbtiFrame';

interface HeroCardProps {
  data: HeroType;
  favorites: FavoriteType[];
}

const cnContainer = 'flex gap-4 h-[108px]';
const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-semibold leading-none';

const HeroCard = (props: HeroCardProps) => {
  const { data, favorites } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const residenceName = getResidenceName(data.residence, t);
  const isCurrentFavorite = isInFavorites(data.id, favorites);

  const showedDetails = [
    {
      title: t('data:age.title'),
      value: data.age
    },
    {
      title: t('data:height.title'),
      value: data.height
    },
    {
      title: t('data:status.title'),
      value: <HeroStatus statusId={data.status} />
    }
  ];

  const handleToggleFavorite = useCallback(() => {
    const action = isCurrentFavorite ? removeFavorite : addFavorite;
    dispatch(action(data.id));
  }, [data, favorites, dispatch]);

  const DetailsBoxes = () =>
    showedDetails.map((detail) => (
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
        to={`${RoutePath.HERO_DETAILS}/${data.id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={data.mbti}>
          <CharacterPicture
            imgSource={`/assets/img/heroes/${data.id}.jpg`}
            variant={'roundedBtm'}
          />
        </MbtiFrame>
      </Link>
      <div className={'flex flex-1 flex-col justify-between'}>
        <div className={'relative mt-0.5 flex w-full flex-col gap-1'}>
          <div className={'pr-10 text-lg font-medium leading-none'}>{`${data.firstName || ''} ${
            data.lastName || ''
          }`}</div>
          <div className={'pr-10 text-sm font-medium capitalize leading-none text-muted-foreground'}>
            {residenceName}
          </div>
          <HeartButton
            className={'absolute right-0 top-0'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'flex h-[52px] w-full items-center justify-center gap-8 rounded-md bg-accent px-4'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
