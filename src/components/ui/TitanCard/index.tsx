import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { useToggleFavorite } from '@/components/hooks/useToggleFavorite';
import { RoutePath } from '@/constants/enums';
import { FavoriteType, HeroType, TitanType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/titansSlice';
import { getAllegianceNames, getHeroName, isInFavorites } from '@/utils/dataHelpers';

import useAppSelector from '../../hooks/useAppSelector';
import CharacterPicture from '../CharacterPicture';
import HeartButton from '../HeartButton';
import MbtiFrame from '../MbtiFrame';
import DetailsBoxes from './components/DetailsBoxes';

interface TitanCardProps {
  data: TitanType;
  favorites: FavoriteType[];
  heroesData: HeroType[];
}

const cnContainer = 'flex gap-4 h-27';

const TitanCard = (props: TitanCardProps) => {
  const { data, favorites, heroesData } = props;
  const { id, mbti, name = '', allegiance, currentInheritor } = data;

  const { t } = useTranslation();
  const isShowingSpoilers = useAppSelector((state) => state.spoilerMode);

  const currentInheritorName = useMemo(() => getHeroName(currentInheritor, heroesData), [currentInheritor, heroesData]);
  const allegianceNames = useMemo(() => getAllegianceNames(allegiance, t), [allegiance, t]);
  const isCurrentFavorite = useMemo(() => isInFavorites(id, favorites), [id, favorites]);

  const toggleFavorite = useToggleFavorite(isCurrentFavorite, id, addFavorite, removeFavorite);

  return (
    <div className={cnContainer}>
      <Link
        href={`${RoutePath.TITAN_DETAILS}/${id}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={mbti}>
          <CharacterPicture
            imgSource={`/assets/img/titans/${id}.jpg`}
            alt={`${name} - Attack on Titan ${t('common:brand')}`}
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
            onToggleFavorite={toggleFavorite}
          />
        </div>
        <div className={'flex h-13 w-full items-center justify-center gap-8 rounded-md bg-muted px-4'}>
          <DetailsBoxes
            data={data}
            allegianceNames={allegianceNames}
          />
        </div>
      </div>
    </div>
  );
};

export default TitanCard;
