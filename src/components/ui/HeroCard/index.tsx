import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutePath } from '@/constants/enums';
import { FavoriteType, HeroType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { getResidenceName, isInFavorites } from '@/utils/dataHelpers';

import useAppSelector from '../../hooks/useAppSelector';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';
import CharacterPicture from '../CharacterPicture';
import HeartButton from '../HeartButton';
import MbtiFrame from '../MbtiFrame';
import DetailsBoxes from './components/DetailsBoxes';

interface HeroCardProps {
  data: HeroType;
  favorites: FavoriteType[];
}

const cnContainer = 'flex gap-4 h-27';

const HeroCard = (props: HeroCardProps) => {
  const { data, favorites } = props;
  const { id, mbti, firstName = '', lastName = '', residence } = data;

  const { t } = useTranslation();
  const isShowingSpoilers = useAppSelector((state) => state.spoilerMode);

  const residenceName = useMemo(() => getResidenceName(residence, t), [residence, t]);
  const isCurrentFavorite = useMemo(() => isInFavorites(id, favorites), [id, favorites]);

  const toggleFavorite = useToggleFavorite(isCurrentFavorite, id, addFavorite, removeFavorite);

  return (
    <div className={cnContainer}>
      <Link
        to={`${RoutePath.HERO_DETAILS}/${id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={mbti}>
          <CharacterPicture
            imgSource={`/assets/img/heroes/${id}.jpg`}
            alt={`${firstName} ${lastName} - ${t('common:brand')}`}
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
            onToggleFavorite={toggleFavorite}
          />
        </div>
        <div className={'flex h-13 justify-center rounded-md bg-muted px-2'}>
          {/* @todo make a container query for the card (more info in gray bar - when card is larger) */}
          {/* @todo zamiast max width zrob tak, ze kazdy box ma swoj max i standardowo sie on rozpycha */}
          <div className={'flex w-full max-w-[260px] items-center justify-evenly'}>
            <DetailsBoxes
              isShowingSpoilers={isShowingSpoilers}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
