import { useTranslation } from 'react-i18next';

import HeroStatus from '@/components/ui/HeroStatus';
import SpoilerContent from '@/components/ui/SpoilerContent';
import { HeroType } from '@/constants/types';
import DetailsTile from '@/features/Details/components/DetailsTile';
import { getMbtiShortName, getResidenceName, getSpeciesName } from '@/utils/dataHelpers';

interface MobileTIlesProps {
  hero: HeroType;
}

const MobileTiles = (props: MobileTIlesProps) => {
  const { hero } = props;
  const { t } = useTranslation();

  return (
    <div className={'details-tiles-wrapper'}>
      <DetailsTile
        title={t('data:mbti.title')}
        value={getMbtiShortName(hero.mbti) || '-'}
      />
      <DetailsTile
        title={t('data:species.title')}
        value={SpoilerContent(getSpeciesName(hero.species, t))}
      />
      <DetailsTile
        title={t('data:residence.title')}
        value={getResidenceName(hero.residence, t) || '-'}
      />
      <DetailsTile
        title={t('data:status.title')}
        value={SpoilerContent(
          <HeroStatus
            statusId={hero.status}
            className={'font-medium'}
            textAbbreviation={'long'}
          />
        )}
      />
      <DetailsTile
        title={t('data:age.title')}
        value={hero.age || '-'}
      />
      <DetailsTile
        title={t('data:height.title')}
        value={hero.height ? `${hero.height} cm` : '-'}
      />
      <DetailsTile
        title={t('data:weight.title')}
        value={hero.height ? `${hero.weight} kg` : '-'}
      />
    </div>
  );
};

export default MobileTiles;
