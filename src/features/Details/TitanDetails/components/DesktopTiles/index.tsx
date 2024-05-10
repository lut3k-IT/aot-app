import { useTranslation } from 'react-i18next';

import { TitanType } from '@/constants/types';
import DetailsTile from '@/features/Details/components/DetailsTile';
import { getAllegianceNames, getMbtiShortName } from '@/utils/dataHelpers';
import { SpoilerContent } from '@/utils/layoutHelpers';

interface DesktopTilesProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const DesktopTiles = (props: DesktopTilesProps) => {
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
        value={SpoilerContent(currentInheritor)}
      />
      <DetailsTile
        title={t('data:otherNames')}
        value={titan.otherNames.length > 0 ? titan.otherNames.join(', ') : '-'}
        span={2}
      />
      <DetailsTile
        title={t('data:abilities')}
        value={titan.abilities.length > 0 ? titan.abilities.join(', ') : '-'}
        span={2}
      />
      <DetailsTile
        title={t('data:formerInheritors')}
        value={SpoilerContent(formerInheritors)}
      />
    </div>
  );
};

export default DesktopTiles;
