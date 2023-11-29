import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAppSelector from '@/components/hooks/useAppSelector';
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
const DEFAULT_COMPARISON_STATE = [null, null];

// todo: save heroes in params

const HeroesComparison = () => {
  const { t } = useTranslation();

  const [selectedHeroes, setSelectedHeroes] = useState<HeroTypeSelected[]>(DEFAULT_COMPARISON_STATE);
  const [heroesForSelect, setHeroesForSelect] = useState<HeroForSelect[]>([]);

  const heroes = useAppSelector((state) => state.heroes.data);
  const favoriteHeroesIds = useAppSelector((state) => state.heroes.favoriteIds);
  const fetchingStatus = useAppSelector((state) => state.heroes.status);
  const fetchingError = useAppSelector((state) => state.heroes.error);

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
      className={
        'mb-2 mt-4 grid w-full grid-flow-col grid-cols-2 grid-rows-[repeat(10,auto)] justify-items-center gap-x-2 gap-y-6'
      }
    >
      <AppHelmet title={`${t('common:title.heroes')} ${t('common:tab.comparison')}`} />
      {selectedHeroes.map((data, index) => {
        const isOdd = index === 0;
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
              className={'mb-4'}
            />
            <DetailItem
              title={t('data:firstName')}
              value={data?.firstName}
              isOdd={isOdd}
            />
            <DetailItem
              title={t('data:lastName')}
              value={data?.lastName}
            />
            <DetailItem
              title={t('data:species.title')}
              value={data && getSpeciesName(data.species, t)}
              isOdd={isOdd}
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
              isOdd={isOdd}
            />
            <DetailItem
              title={t('data:mbti.title')}
              value={data && getMbtiShortName(data.mbti)}
            />
            <DetailItem
              title={t('data:age.title')}
              value={data?.age}
              isOdd={isOdd}
            />
            <DetailItem
              title={t('data:height.title')}
              value={data?.height ? `${data.height} cm` : '-'}
            />
            <DetailItem
              title={t('data:weight.title')}
              value={data?.weight ? `${data.weight} kg` : '-'}
              isOdd={isOdd}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroesComparison;
