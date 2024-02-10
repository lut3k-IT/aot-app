import React from 'react';
import { useTranslation } from 'react-i18next';

import HeroStatus from '@/components/ui/HeroStatus';
import { HeroType } from '@/constants/types';
import { getMbtiShortName, getResidenceName, getSpeciesName } from '@/utils/dataHelpers';

interface TileProps {
  title: string;
  value: string | React.ReactNode;
}

const Tile = (props: TileProps) => {
  const { title, value } = props;
  return (
    <div className={'flex-center flex flex-col gap-2 rounded-md bg-muted p-4'}>
      <div className={'text-center font-bold text-muted-foreground'}>{title}</div>
      <div className={'flex-1 text-center text-lg'}>{value}</div>
    </div>
  );
};

interface DesktopTilesProps {
  hero: HeroType;
}

const DesktopTiles = (props: DesktopTilesProps) => {
  const { hero } = props;
  const { t } = useTranslation();

  return (
    <div className={'mt-8 grid grid-cols-[repeat(auto-fill,_minmax(9rem,_1fr))] gap-4'}>
      <Tile
        title={t('data:mbti.title')}
        value={getMbtiShortName(hero.mbti) || '-'}
      />
      <Tile
        title={t('data:species.title')}
        value={getSpeciesName(hero.species, t) || '-'}
      />
      <Tile
        title={t('data:residence.title')}
        value={getResidenceName(hero.residence, t) || '-'}
      />
      <Tile
        title={t('data:status.title')}
        value={
          <HeroStatus
            statusId={hero.status}
            className={'font-medium'}
            textAbbreviation={'long'}
          />
        }
      />
      <Tile
        title={t('data:age.title')}
        value={hero.age || '-'}
      />
      <Tile
        title={t('data:height.title')}
        value={hero.height ? `${hero.height} cm` : '-'}
      />
      <Tile
        title={t('data:weight.title')}
        value={hero.height ? `${hero.weight} kg` : '-'}
      />
    </div>
  );
};

export default DesktopTiles;
