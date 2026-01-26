import { useTranslation } from 'react-i18next';

import SpoilerContent from '@/components/ui/SpoilerContent';
import { TitanType } from '@/constants/types';
import DetailsTile from '@/features/Details/components/DetailsTile';
import { getAllegianceNames, getMbtiShortName } from '@/utils/dataHelpers';

interface MobileTIlesProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const MobileTiles = (props: MobileTIlesProps) => {
  const { titan, currentInheritor, formerInheritors } = props;
  const { t } = useTranslation();

  return (
    <div className={'details-tiles-wrapper'}>
      <DetailsTile
        title={t('data:mbti.title')}
        value={getMbtiShortName(titan.mbti) || '-'}
      />
      <DetailsTile
        title={t('data:height.title')}
        value={`${titan.height} cm`}
      />
      <DetailsTile
        title={t('data:allegiance.title')}
        value={getAllegianceNames(titan.allegiance, t).join(', ')}
      />
      <DetailsTile
        title={t('data:currentInheritor')}
        value={<SpoilerContent>{currentInheritor}</SpoilerContent>}
      />
      <DetailsTile
        title={t('data:formerInheritors')}
        value={<SpoilerContent>{formerInheritors}</SpoilerContent>}
      />
      <DetailsTile
        title={t('data:otherNames')}
        value={titan.otherNames.length > 0 ? titan.otherNames.join(', ') : '-'}
      />
      <DetailsTile
        title={t('data:abilities')}
        value={titan.abilities.length > 0 ? titan.abilities.join(', ') : '-'}
      />
    </div>
  );
};

export default MobileTiles;
