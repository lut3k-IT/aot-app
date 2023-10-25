import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const mbtiFrameVariants = cva('flex flex-col w-min rounded-md border-2 overflow-hidden', {
  variants: {
    variant: {
      default: 'border-neutral-400 bg-neutral-500 dark:border-neutral-700 dark:bg-neutral-600',
      analyst: 'border-violet-400 bg-violet-500 dark:border-violet-900 dark:bg-violet-800',
      diplomat: 'border-emerald-500 bg-emerald-600 dark:border-emerald-800 dark:bg-emerald-700',
      sentinel: 'border-cyan-500 bg-cyan-600 dark:border-cyan-800 dark:bg-cyan-700',
      explorer: 'border-yellow-400 bg-yellow-500 dark:border-yellow-800 dark:bg-yellow-700'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface MbtiFrameProps extends VariantProps<typeof mbtiFrameVariants>, React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MbtiFrame = (props: MbtiFrameProps) => {
  const { children, variant, ...rest } = props;

  return (
    <div
      className={cn(mbtiFrameVariants({ variant }))}
      {...rest}
    >
      {children}
      <div className={'text-sm text-white dark:text-neutral-100 font-semibold w-full text-center'}>Unknown</div>
    </div>
  );
};

export default MbtiFrame;
