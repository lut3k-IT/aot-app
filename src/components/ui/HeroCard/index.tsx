import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { RoutePath } from '@/constants/enums';
import { HeroType } from '@/constants/types';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { selectSpoilerMode } from '@/store/spoilerModeSlice';
import { getHeroImageSource, getResidenceName } from '@/utils/dataHelpers';

import useAppSelector from '../../hooks/useAppSelector';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';
import CharacterPicture from '../CharacterPicture';
import HeartButton from '../HeartButton';
import MbtiFrame from '../MbtiFrame';
import DetailsBoxes from './components/DetailsBoxes';

interface HeroCardProps {
  data: HeroType;
  isFavorite: boolean;
}

const cnContainer = 'flex gap-4 h-27';

const HeroCard = (props: HeroCardProps) => {
  const { data, isFavorite } = props;
  const { id, mbti, firstName = '', lastName = '', residence, slug } = data;

  const { t } = useTranslation();
  const isShowingSpoilers = useAppSelector(selectSpoilerMode);

  const residenceName = useMemo(() => getResidenceName(residence, t), [residence, t]);

  const toggleFavorite = useToggleFavorite(isFavorite, id, addFavorite, removeFavorite);

  return (
    <div className={cnContainer}>
      <Link
        href={`${RoutePath.HERO_DETAILS}/${slug}`}
        className={'rounded-md'}
      >
        <MbtiFrame mbtiId={mbti}>
          <CharacterPicture
            imgSource={getHeroImageSource(slug)}
            alt={`${firstName} ${lastName} - Attack on Titan ${t('common:brand')}`}
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
            isFilled={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
        <div className={'flex h-13 justify-center rounded-md bg-muted px-2'}>
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

export default memo(HeroCard);
