import { ReactNode } from 'react';

import Icon from '@/components/ui/Icon';
import { IconNames } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface TitanStatTileProps {
  icon: IconNames;
  label: string;
  value: ReactNode;
  className?: string;
}

const TitanStatTile = ({ icon, label, value, className }: TitanStatTileProps) => (
  <div className={cn('flex flex-col gap-1.5 rounded-lg bg-muted p-4', className)}>
    <div className={'flex items-center gap-2 text-sm text-muted-foreground'}>
      <Icon
        name={icon}
        size={'xs'}
        variant={'gray'}
      />
      <span>{label}</span>
    </div>
    <div className={'text-lg font-medium'}>{value || '—'}</div>
  </div>
);

export default TitanStatTile;
