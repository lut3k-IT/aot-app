import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { TextAbbreviation } from '@/constants/types';
import { getStatusName } from '@/utils/dataHelpers';

interface HeroStatusProps {
  statusId: number;
  className?: string;
  textAbbreviation?: TextAbbreviation;
}

const HeroStatus = (props: HeroStatusProps) => {
  const { statusId, className, textAbbreviation } = props;
  const { t } = useTranslation();

  const statusName = getStatusName(statusId, t, textAbbreviation);

  return (
    <span
      className={classNames(
        'contents',
        {
          'text-green-800/90 dark:text-green-200/80': statusId === 1,
          'text-red-800/80 dark:text-red-200/80': statusId === 2
        },
        className
      )}
    >
      {statusName}
    </span>
  );
};

export default HeroStatus;
