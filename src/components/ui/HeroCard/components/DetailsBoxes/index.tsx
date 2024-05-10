import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import HeroStatus from '@/components/ui/HeroStatus';
import { HeroType } from '@/constants/types';

const cnDetailBox = 'flex flex-col items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-medium leading-none';

interface DetailsBoxesProps {
  isShowingSpoilers: boolean;
  data: HeroType;
}

const DetailsBoxes = (props: DetailsBoxesProps) => {
  const { isShowingSpoilers, data } = props;
  const { age, height, weight, status } = data;
  const { t } = useTranslation();

  const showedDetails = useMemo(
    () => [
      {
        title: t('data:age.title'),
        value: age
      },
      {
        title: t('data:height.title'),
        value: height
      },
      {
        title: t('data:status.title'),
        value: <HeroStatus statusId={status} />
      }
    ],
    [t, age, height, status]
  );

  const showedDetailsSpoiler = useMemo(
    () => [
      {
        title: t('data:age.title'),
        value: age
      },
      {
        title: t('data:height.title'),
        value: height
      },
      {
        title: t('data:weight.title'),
        value: weight
      }
    ],
    [t, age, height, weight]
  );

  const detailsToShow = isShowingSpoilers === true ? showedDetails : showedDetailsSpoiler;

  return detailsToShow.map((detail) => (
    <div
      className={cnDetailBox}
      key={detail.title}
    >
      <div className={cnDetailTitle}>{detail.title}</div>
      <div className={cnDetailValue}>{detail.value || '-'}</div>
    </div>
  ));
};

export default DetailsBoxes;
