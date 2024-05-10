import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TitanType } from '@/constants/types';

const cnDetailBox = 'flex flex-col justify-between items-center gap-1';
const cnDetailTitle = 'text-sm font-medium text-muted-foreground leading-none';
const cnDetailValue = 'text-lg font-medium leading-none';

interface DetailsBoxesProps {
  data: TitanType;
  allegianceNames: (string | null)[];
}

const DetailsBoxes = (props: DetailsBoxesProps) => {
  const { data, allegianceNames } = props;
  const { height } = data;
  const { t } = useTranslation();

  const showedDetails = useMemo(
    () => [
      {
        title: t('data:height.title'),
        value: height
      },
      {
        title: t('data:allegiance.title'),
        value: allegianceNames[0]
      }
    ],
    [data, allegianceNames, t]
  );

  return showedDetails.map((detail) => (
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
