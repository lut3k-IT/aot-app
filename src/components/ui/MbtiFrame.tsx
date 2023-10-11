import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const mbtiFrameVariants = cva('flex flex-col w-min rounded-md border-2 overflow-hidden', {
  variants: {
    variant: {
      default: 'border-neutral-400 bg-neutral-500',
      analyst: 'border-violet-400 bg-violet-500',
      diplomat: 'border-emerald-500 bg-emerald-600',
      sentinel: 'border-cyan-500 bg-cyan-600',
      explorer: 'border-yellow-400 bg-yellow-500'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface MbtiFrameProps extends VariantProps<typeof mbtiFrameVariants> {
  children: React.ReactNode;
}

const MbtiFrame = (props: MbtiFrameProps) => {
  const { children, variant } = props;

  return (
    <div className={cn(mbtiFrameVariants({ variant }))}>
      {children}
      <div className={'text-sm text-neutral-100 font-semibold w-full text-center'}>Unknown</div>
    </div>
  );
};

export default MbtiFrame;
