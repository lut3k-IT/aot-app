import { useTranslation } from 'react-i18next';

import mbti from '@/data/mbti';
import mbtiGroup from '@/data/mbti-group';
import residences from '@/data/residences';
import statuses from '@/data/statuses';

export const getResidenceName = (id: number) => {
  const { t } = useTranslation();
  const residenceKeyName = residences.find((x) => x.id === id)?.keyName;
  return residenceKeyName ? t(`data:residence.${residenceKeyName}`) : null;
};

export const getStatusName = (id: number) => {
  const { t } = useTranslation();
  const statusKeyName = statuses.find((x) => x.id === id)?.keyName;
  return statusKeyName ? t(`data:status.${statusKeyName}.short`) : null;
};

export const getMbtiShortName = (id: number) => mbti.find((x) => x.id === id)?.shortName;

export const getMbtiLongName = (id: number) => {
  const { t } = useTranslation();
  const mbtiKeyName = mbti.find((x) => x.id === id)?.keyName;
  return mbtiKeyName ? t(`data:mbti.${mbtiKeyName}`) : null;
};

export const getMbtiGroupName = (id: number) => {
  const { t } = useTranslation();
  const mbtiGroupKeyName = mbtiGroup.find((x) => x.id === id)?.keyName;
  return mbtiGroupKeyName ? t(`data:mbtiGroup.${mbtiGroupKeyName}`) : null;
};
