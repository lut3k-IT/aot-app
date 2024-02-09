import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import useAppSelector from '@/components/hooks/useAppSelector';
import useIsMobile from '@/components/hooks/useIsMobile';
import AppHelmet from '@/components/ui/AppHelmet';
import HeroStatus from '@/components/ui/HeroStatus';
import { HeroType } from '@/constants/types';
import { getMbtiShortName, getResidenceName, getSpeciesName } from '@/utils/dataHelpers';

import DetailItem from './components/DetailItem';
import PictureWithSelect from './components/PictureWithSelect';

export type HeroTypeSelected = HeroType | null;
export type HeroForSelect = {
  id: number;
  value: string;
};

// @todo save heroes in params

const DEFAULT_COMPARISON_STATE = Array(3).fill(null);

const HeroesComparison = () => {
  const { t } = useTranslation();
  const isTwoColumns = useIsMobile(848);

  // const DEFAULT_COMPARISON_STATE = Array.from({ length: isTwoColumns ? 2 : 3 }, () => null);

  const [selectedHeroes, setSelectedHeroes] = useState<HeroTypeSelected[]>(DEFAULT_COMPARISON_STATE);
  const [heroesForSelect, setHeroesForSelect] = useState<HeroForSelect[]>([]);

  const heroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

  // useEffect(() => {
  //   setSelectedHeroes((prev) => {
  //     if (isTwoColumns) {
  //       return prev.slice(0, 2);
  //     } else {
  //       return prev.length === 2 ? [...prev, null] : prev;
  //     }
  //   });
  // }, [isTwoColumns]);

  useEffect(() => {
    setHeroesForSelect(
      heroes.map((hero) => {
        return {
          id: hero.id,
          value: `${hero.firstName} ${hero.lastName || ''}`
        };
      })
    );
  }, [heroes]);

  const handleUpdateColumn = (chosenHero: HeroForSelect, columnId: number) => {
    const foundHero = heroes.find((original) => chosenHero.id === original.id);

    setSelectedHeroes((currSelected) => {
      return currSelected.map((arrayItem: HeroTypeSelected, arrayId: number) => {
        return arrayId === columnId ? foundHero || arrayItem : arrayItem;
      });
    });
  };

  return (
    <div
      className={classNames('mb-2 mt-4 grid w-full grid-flow-col grid-rows-[repeat(10,auto)] justify-items-center', {
        'grid-cols-2': isTwoColumns,
        'grid-cols-3': !isTwoColumns
      })}
    >
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.comparison')}`} />
      {selectedHeroes.map((data, index) => {
        const isFirstColumn = index === 0;
        const isLastColumn = index === selectedHeroes.length - 1;

        if (isTwoColumns && index === 2) return null;

        return (
          <div
            className={'contents'}
            key={index}
          >
            <PictureWithSelect
              componentId={index}
              heroesForSelect={heroesForSelect}
              selectedHero={data}
              onSelectHero={handleUpdateColumn}
              className={'mb-8'}
            />
            <DetailItem
              title={t('data:firstName')}
              value={data?.firstName}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
              isOddRow
            />
            <DetailItem
              title={t('data:lastName')}
              value={data?.lastName}
            />
            <DetailItem
              title={t('data:species.title')}
              value={data && getSpeciesName(data.species, t)}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
              isOddRow
            />
            <DetailItem
              title={t('data:residence.title')}
              value={data && getResidenceName(data.residence, t)}
            />

            <DetailItem
              title={t('data:status.title')}
              value={
                data && (
                  <HeroStatus
                    statusId={data.status}
                    className={'font-medium'}
                  />
                )
              }
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
              isOddRow
            />
            <DetailItem
              title={t('data:mbti.title')}
              value={data && getMbtiShortName(data.mbti)}
            />
            <DetailItem
              title={t('data:age.title')}
              value={data?.age}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
              isOddRow
            />
            <DetailItem
              title={t('data:height.title')}
              value={data?.height ? `${data.height} cm` : '-'}
            />
            <DetailItem
              title={t('data:weight.title')}
              value={data?.weight ? `${data.weight} kg` : '-'}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
              isOddRow
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroesComparison;
