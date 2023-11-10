import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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

  const residenceName = getResidenceName(data.residence);
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
      <MbtiFrame
        mbtiId={data.mbti}
        onClick={() => navigate(`${RoutePath.HERO_DETAILS}/${data.id}`)}
      >
        <CharacterPicture
          imgSource={`/assets/img/heroes/${data.id}.jpg`}
          variant={'roundedBtm'}
        />
      </MbtiFrame>
      <div className={'flex flex-col flex-1 justify-between'}>
        <div className={'w-full flex flex-col gap-1 mt-0.5 relative'}>
          <div className={'text-lg leading-none font-medium pr-10'}>{`${data.firstName || ''} ${
            data.lastName || ''
          }`}</div>
          <div className={'text-sm leading-none font-medium text-muted-foreground pr-10 capitalize'}>
            {residenceName}
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

export default HeroCard;
