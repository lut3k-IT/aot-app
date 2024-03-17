import { useTranslation } from 'react-i18next';

import { DetailsGridRow } from '@/components/ui/DetailsGridRow';
import HeroStatus from '@/components/ui/HeroStatus';
import { HeroType } from '@/constants/types';
import { getMbtiShortName, getResidenceName, getSpeciesName } from '@/utils/dataHelpers';
import { SpoilerContent } from '@/utils/layoutHelpers';

interface MobileTIlesProps {
  hero: HeroType;
}

const MobileTiles = (props: MobileTIlesProps) => {
  const { hero } = props;
  const { t } = useTranslation();

  return (
    <div className={'mt-8 grid grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-4'}>
      <DetailsGridRow
        title={t('data:mbti.title')}
        value={getMbtiShortName(hero.mbti) || '-'}
      />
      <DetailsGridRow
        title={t('data:species.title')}
        value={SpoilerContent(getSpeciesName(hero.species, t))}
      />
      <DetailsGridRow
        title={t('data:residence.title')}
        value={getResidenceName(hero.residence, t) || '-'}
      />
      <DetailsGridRow
        title={t('data:status.title')}
        value={SpoilerContent(
          <HeroStatus
            statusId={hero.status}
            className={'font-medium'}
            textAbbreviation={'long'}
          />
        )}
      />
      <DetailsGridRow
        title={t('data:age.title')}
        value={hero.age || '-'}
      />
      <DetailsGridRow
        title={t('data:height.title')}
        value={hero.height ? `${hero.height} cm` : '-'}
      />
      <DetailsGridRow
        title={t('data:weight.title')}
        value={hero.height ? `${hero.weight} kg` : '-'}
      />
    </div>
  );
};

export default MobileTiles;
