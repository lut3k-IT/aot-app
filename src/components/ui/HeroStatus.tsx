import { getStatusName } from '@/utils/dataHelpers';

interface HeroStatusProps {
  statusId: number;
}

const HeroStatus = (props: HeroStatusProps) => {
  const { statusId } = props;
  const statusName = getStatusName(statusId);

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

  return <span className={`contents ${statusClassName}`}>{statusName}</span>;
};

export default HeroStatus;
