import React from 'react';

import Icon, { IconNames } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface HeroStatTileProps {
  icon: IconNames;
  label: string;
  value: React.ReactNode;
  className?: string;
}

const HeroStatTile = ({ icon, label, value, className }: HeroStatTileProps) => {
  return (
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
};

export default HeroStatTile;
