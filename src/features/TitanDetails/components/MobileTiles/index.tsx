import { useTranslation } from 'react-i18next';

import { DetailsGridRow } from '@/components/ui/DetailsGridRow';
import { TitanType } from '@/constants/types';
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
    <div className={'mt-6 grid grid-cols-[minmax(100px,_120px)_minmax(120px,_2fr)] items-start gap-x-4 gap-y-3'}>
      <DetailsGridRow
        title={t('data:mbti.title')}
        value={getMbtiShortName(titan.mbti) || '-'}
      />
      <DetailsGridRow
        title={t('data:height.title')}
        value={`${titan.height} cm`}
      />
      <DetailsGridRow
        title={t('data:allegiance.title')}
        value={getAllegianceNames(titan.allegiance, t).join(', ')}
      />
      <DetailsGridRow
        title={t('data:currentInheritor')}
        value={currentInheritor || '-'}
      />
      <DetailsGridRow
        title={t('data:formerInheritors')}
        value={formerInheritors || '-'}
      />
      <DetailsGridRow
        title={t('data:otherNames')}
        value={titan.otherNames.length > 0 ? titan.otherNames.join(', ') : '-'}
      />
      <DetailsGridRow
        title={t('data:abilities')}
        value={titan.abilities.length > 0 ? titan.abilities.join(', ') : '-'}
      />
    </div>
  );
};

export default MobileTiles;
