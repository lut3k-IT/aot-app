import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { RoutePath } from '@/constants/enums';
import { HeroType } from '@/constants/types';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite } from '@/store/heroesSlice';
import { selectNoteFor } from '@/store/notesSlice';
import { selectSpoilerMode } from '@/store/spoilerModeSlice';
import { getHeroImageSource, getMbtiShortName, getResidenceName } from '@/utils/dataHelpers';

import useAppSelector from '../hooks/useAppSelector';
import { useToggleFavorite } from '../hooks/useToggleFavorite';
import CharacterPicture from './CharacterPicture';
import HeartButton from './HeartButton';
import HeroStatus from './HeroStatus';
import Icon from './Icon';
import { MbtiDot } from './MbtiFrame';

/**
 * Wspólna siatka kolumn wiersza i jego nagłówka. Trzyma je w jednym miejscu,
 * żeby etykiety zawsze stały nad swoimi wartościami.
 */
const HERO_ROW_GRID =
  'grid grid-cols-[2.5rem_minmax(7rem,1fr)_4.5rem_minmax(5rem,10rem)_3rem_4rem_5.5rem_2rem] items-center gap-x-4';

const cnNumeric = 'text-right text-sm tabular-nums';

export const HeroRowHeader = () => {
  const { t } = useTranslation();
  const isShowingSpoilers = useAppSelector(selectSpoilerMode);

  return (
    <div
      className={cn(
        HERO_ROW_GRID,
        'border-b border-border px-3 pb-2 text-sm font-medium text-muted-foreground'
      )}
    >
      <span />
      <span>{t('common:title.heroes')}</span>
      <span>{t('data:mbti.title')}</span>
      <span>{t('data:residence.title')}</span>
      <span className={'text-right'}>{t('data:age.title')}</span>
      <span className={'text-right'}>{t('data:height.title')}</span>
      <span>{isShowingSpoilers ? t('data:status.title') : t('data:weight.title')}</span>
      <span />
    </div>
  );
};

interface HeroRowProps {
  data: HeroType;
  isFavorite: boolean;
}

const HeroRow = (props: HeroRowProps) => {
  const { data, isFavorite } = props;
  const { id, mbti, firstName = '', lastName = '', residence, slug, age, height, weight, status } = data;

  const { t } = useTranslation();
  const isShowingSpoilers = useAppSelector(selectSpoilerMode);
  const note = useAppSelector(selectNoteFor('hero', id));

  const residenceName = useMemo(() => getResidenceName(residence, t), [residence, t]);
  const mbtiName = mbti ? getMbtiShortName(mbti) : '–';

  const toggleFavorite = useToggleFavorite(isFavorite, id, addFavorite, removeFavorite);

  const fullName = `${firstName || ''} ${lastName || ''}`.trim();

  return (
    <div className={cn(HERO_ROW_GRID, 'rounded-md px-3 py-1.5 transition-colors hover:bg-muted/70')}>
      <Link
        href={`${RoutePath.HERO_DETAILS}/${slug}`}
        tabIndex={-1}
        aria-hidden
      >
        <CharacterPicture
          imgSource={getHeroImageSource(slug)}
          alt={''}
          size={'xs'}
          variant={'rounded'}
        />
      </Link>
      <Link
        href={`${RoutePath.HERO_DETAILS}/${slug}`}
        className={'flex min-w-0 items-center gap-1.5 rounded-sm font-medium hover:underline'}
      >
        <span className={'truncate'}>{fullName}</span>
        {note && (
          <Icon
            name={'stickyNote'}
            size={'xs'}
            variant={'gray'}
            aria-label={t('common:notes.title')}
          />
        )}
      </Link>
      <span className={'flex items-center gap-1.5 text-sm text-muted-foreground'}>
        <MbtiDot mbtiId={mbti} />
        {mbtiName}
      </span>
      <span className={'truncate text-sm capitalize text-muted-foreground'}>{residenceName}</span>
      <span className={cnNumeric}>{age || '–'}</span>
      <span className={cnNumeric}>{height || '–'}</span>
      <span className={'text-sm'}>
        {isShowingSpoilers ? <HeroStatus statusId={status} /> : weight || '–'}
      </span>
      <HeartButton
        isFilled={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default memo(HeroRow);
