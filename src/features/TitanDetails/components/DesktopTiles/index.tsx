import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { TitanType } from '@/constants/types';
import { getAllegianceNames, getMbtiShortName } from '@/utils/dataHelpers';
import { SpoilerContent } from '@/utils/layoutHelpers';

interface TileProps {
  title: string;
  value: string | React.ReactNode;
  span?: number;
}

const Tile = (props: TileProps) => {
  const { title, value, span } = props;

  return (
    <div
      className={classNames('flex-center flex flex-col gap-2 rounded-md bg-muted p-4', {
        [`col-span-${span}`]: span
      })}
    >
      <div className={'text-center font-bold text-muted-foreground'}>{title}</div>
      <div className={'flex-1 text-center text-lg'}>{value}</div>
    </div>
  );
};

interface DesktopTilesProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const DesktopTiles = (props: DesktopTilesProps) => {
  const { titan, currentInheritor, formerInheritors } = props;
  const { t } = useTranslation();

  // @follow-up pracujesz teraz nad grid-flow-row-dense

  return (
    <div className={'mt-8 grid grid-flow-row-dense grid-cols-[repeat(auto-fill,_minmax(9rem,_1fr))] gap-4'}>
      <Tile
        title={t('data:mbti.title')}
        value={getMbtiShortName(titan.mbti) || '-'}
      />
      <Tile
        title={t('data:height.title')}
        value={`${titan.height} cm`}
      />
      <Tile
        title={t('data:allegiance.title')}
        value={getAllegianceNames(titan.allegiance, t).join(', ')}
      />
      <Tile
        title={t('data:currentInheritor')}
        value={SpoilerContent(currentInheritor)}
      />
      <Tile
        title={t('data:otherNames')}
        value={titan.otherNames.length > 0 ? titan.otherNames.join(', ') : '-'}
        span={2}
      />
      <Tile
        title={t('data:abilities')}
        value={titan.abilities.length > 0 ? titan.abilities.join(', ') : '-'}
        span={2}
      />
      <Tile
        title={t('data:formerInheritors')}
        value={SpoilerContent(formerInheritors)}
      />
    </div>
  );
};

export default DesktopTiles;
