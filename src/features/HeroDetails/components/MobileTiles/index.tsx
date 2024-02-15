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
    <div className={'mt-6 grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] items-start gap-x-4 gap-y-3'}>
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
