/* eslint-disable no-undef */
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
      className={cn('flex-center w-max text-xs text-muted-foreground', className)}
    >
      v{APP_VERSION}
    </Badge>
  );
};

export default AppVersionBadge;
