import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { getStatusName } from '@/utils/dataHelpers';

interface HeroStatusProps {
  statusId: number;
  className?: string;
}

const HeroStatus = (props: HeroStatusProps) => {
  const { statusId, className } = props;
  const { t } = useTranslation();

  const statusName = getStatusName(statusId, t);

  return (
    <span
      className={classNames(
        'contents',
        {
          'text-green-800 dark:text-green-200': statusId === 1,
          'text-red-800 dark:text-red-200': statusId === 2
        },
        className
      )}
    >
      {statusName}
    </span>
  );
};

export default HeroStatus;
