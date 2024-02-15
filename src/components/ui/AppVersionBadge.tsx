import { cn } from '@/lib/utils';

import { Badge } from './Badge';

interface AppVersionBadgeProps {
  className?: string;
}

const AppVersionBadge = (props: AppVersionBadgeProps) => {
  const { className } = props;

  return (
    <Badge
      variant={'outline'}
      className={cn('flex-center w-max text-xs', className)}
    >
      Beta
    </Badge>
  );
};

export default AppVersionBadge;
