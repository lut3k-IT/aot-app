import React from 'react';

import { Button } from '@/components/ui/Button';

interface FilterSegmentProps {
  title: string;
  children: React.ReactNode;
  onReset?: () => void;
}

const FilterSegment = (props: FilterSegmentProps) => {
  const { title, children, onReset } = props;
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex h-8 items-center justify-between gap-2'}>
        <h3 className={'font-medium'}>{title}</h3>
        {onReset && (
          <Button
            variant={'link'}
            className={'h-full p-0 px-3 text-destructive'}
            onClick={() => onReset()}
            aria-label={`Reset ${title}`}
          >
            Reset
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default FilterSegment;
