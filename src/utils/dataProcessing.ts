import { useTranslation } from 'react-i18next';

import residences from '@/data/residences';
import statuses from '@/data/statuses';

export const getResidenceName = (id: number) => {
  const { t } = useTranslation();
  const residenceKeyName = residences.find((x) => x.id === id)?.keyName;
  return residenceKeyName ? t(`data:residence.${residenceKeyName}`) : '';
};

export const getStatusName = (id: number) => {
  const { t } = useTranslation();
  const statusKeyName = statuses.find((x) => x.id === id)?.keyName;
  return statusKeyName ? t(`data:status.${statusKeyName}.short`) : '-';
};
