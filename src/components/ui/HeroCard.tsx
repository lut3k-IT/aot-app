import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

const cnContainer = 'flex gap-4 h-27';
const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-medium leading-none';

const HeroCard = (props: HeroCardProps) => {
  const { data, favorites } = props;
  const { id, mbti, age, height, status, firstName = '', lastName = '', residence } = data;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const residenceName = useMemo(() => getResidenceName(residence, t), [residence, t]);
  const isCurrentFavorite = useMemo(() => isInFavorites(id, favorites), [id, favorites]);

  const handleToggleFavorite = useCallback(() => {
    dispatch(isCurrentFavorite ? removeFavorite(id) : addFavorite(id));
  }, [dispatch, isCurrentFavorite, id]);

  const showedDetails = useMemo(
    () => [
      {
        title: t('data:age.title'),
        value: age
      },
      {
        title: t('data:height.title'),
        value: height
      },
      {
        title: t('data:status.title'),
        value: <HeroStatus statusId={status} />
      }
    ],
    [data, t]
  );

  const DetailsBoxes = useCallback(
    () =>
      showedDetails.map((detail) => (
        <div
          className={cnDetailBox}
          key={detail.title}
        >
          <div className={cnDetailTitle}>{detail.title}</div>
          <div className={cnDetailValue}>{detail.value || '-'}</div>
        </div>
      )),
    [showedDetails]
  );

  return (
    <div className={cnContainer}>
      <Link
        to={`${RoutePath.HERO_DETAILS}/${id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={mbti}>
          <CharacterPicture
            imgSource={`/assets/img/heroes/${id}.jpg`}
            variant={'roundedBtm'}
          />
        </MbtiFrame>
      </Link>
      <div className={'flex flex-1 flex-col justify-between'}>
        <div className={'relative mt-0.5 flex w-full flex-col gap-1'}>
          <div className={'pr-10 text-lg font-medium leading-none'}>{`${firstName || ''} ${lastName || ''}`}</div>
          <div className={'pr-10 text-sm font-medium capitalize leading-none text-muted-foreground'}>
            {residenceName}
          </div>
          <HeartButton
            className={'absolute right-0 top-0'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'flex h-13 w-full items-center justify-center gap-8 rounded-md bg-muted px-4'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};
export default HeroCard;
