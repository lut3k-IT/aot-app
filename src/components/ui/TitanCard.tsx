import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getAllegianceNames, getHeroName, isInFavorites } from '@/utils/dataHelpers';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
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
const cnDetailValue = 'text-lg font-medium leading-none';

const TitanCard = (props: TitanCardProps) => {
  const { data, favorites, heroesData } = props;
  const { id, mbti, name = '', height, allegiance, currentInheritor } = data;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isShowingSpoilers = useAppSelector((state) => state.spoilerMode);

  const currentInheritorName = useMemo(() => getHeroName(currentInheritor, heroesData), [currentInheritor, heroesData]);
  const allegianceNames = useMemo(() => getAllegianceNames(allegiance, t), [allegiance, t]);
  const isCurrentFavorite = useMemo(() => isInFavorites(id, favorites), [id, favorites]);

  const showedDetails = useMemo(
    () => [
      {
        title: t('data:height.title'),
        value: height
      },
      {
        title: t('data:allegiance.title'),
        value: allegianceNames[0]
      }
    ],
    [data, t]
  );

  const handleToggleFavorite = useCallback(() => {
    dispatch(isCurrentFavorite ? removeFavorite(id) : addFavorite(id));
  }, [dispatch, isCurrentFavorite, id]);

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
        to={`${RoutePath.TITAN_DETAILS}/${id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={mbti}>
          <CharacterPicture
            imgSource={`/assets/img/titans/${id}.jpg`}
            variant={'roundedBtm'}
          />
        </MbtiFrame>
      </Link>
      <div className={'flex flex-1 flex-col justify-between'}>
        <div className={'relative mt-0.5 flex w-full flex-col gap-1'}>
          <div className={'pr-10 text-lg font-medium leading-none'}>{name || ''}</div>
          {isShowingSpoilers && (
            <div className={'pr-10 text-sm font-medium capitalize leading-none text-muted-foreground'}>
              {currentInheritorName}
            </div>
          )}
          <HeartButton
            className={'absolute right-0 top-0'}
            isFilled={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
        <div className={'flex h-13 w-full items-center justify-center gap-8 rounded-md bg-accent px-4'}>
          <DetailsBoxes />
        </div>
      </div>
    </div>
  );
};

export default TitanCard;
