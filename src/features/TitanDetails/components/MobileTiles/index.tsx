import { useTranslation } from 'react-i18next';

import { DetailsGridRow } from '@/components/ui/DetailsGridRow';
import { TitanType } from '@/constants/types';
import { getAllegianceNames, getMbtiShortName } from '@/utils/dataHelpers';
import { SpoilerContent } from '@/utils/layoutHelpers';

interface MobileTIlesProps {
  titan: TitanType;
  currentInheritor: string;
  formerInheritors: string;
}

const MobileTiles = (props: MobileTIlesProps) => {
  const { titan, currentInheritor, formerInheritors } = props;
  const { t } = useTranslation();

  return (
    <div className={'mt-8 grid grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] gap-4'}>
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
        value={SpoilerContent(currentInheritor)}
      />
      <DetailsGridRow
        title={t('data:formerInheritors')}
        value={SpoilerContent(formerInheritors)}
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
