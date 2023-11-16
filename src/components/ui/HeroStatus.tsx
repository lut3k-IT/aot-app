import { useTranslation } from 'react-i18next';

import { getStatusName } from '@/utils/dataHelpers';

interface HeroStatusProps {
  statusId: number;
  className?: string;
}

const HeroStatus = (props: HeroStatusProps) => {
  const { statusId, className } = props;
  const { t } = useTranslation();

  const statusName = getStatusName(statusId, t);

  let statusClassName = '';

  switch (statusId) {
    case 1:
      statusClassName = 'text-green-800 dark:text-green-200';
      break;
    case 2:
      statusClassName = 'text-red-800 dark:text-red-200';
      break;
    default:
      break;
  }

  return <span className={`contents ${statusClassName} ${className}`}>{statusName}</span>;
};

export default HeroStatus;
