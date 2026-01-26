import { cn } from '@/lib/utils';

import { Badge } from './Badge';

// Version from package.json - in production, this could be injected at build time
const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0';

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
