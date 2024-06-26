import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { MBTI_GROUPS_NAMES } from '@/constants/constants';
import { MbtiGroups } from '@/constants/types';
import mbti from '@/data/mbti';
import { cn } from '@/lib/utils';
import { getMbtiShortName } from '@/utils/dataHelpers';

const mbtiFrameVariants = cva('flex flex-col w-min rounded-md border-2 overflow-hidden', {
  variants: {
    variant: {
      default: 'border-neutral-300 bg-neutral-500 dark:border-neutral-500/30 dark:bg-neutral-500/50',
      analysts: 'border-violet-400 bg-violet-500 dark:border-violet-400/20 dark:bg-violet-500/50',
      diplomats: 'border-emerald-400 bg-emerald-600 dark:border-emerald-900 dark:bg-emerald-700',
      sentinels: 'border-cyan-400 bg-cyan-600 dark:border-cyan-900 dark:bg-cyan-700',
      explorers: 'border-yellow-300 bg-yellow-500 dark:border-yellow-500/20 dark:bg-yellow-600/70'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface MbtiFrameProps extends VariantProps<typeof mbtiFrameVariants>, React.HTMLAttributes<HTMLDivElement> {
  mbtiId: number | null;
  children: React.ReactNode;
}

const MbtiFrame = (props: MbtiFrameProps) => {
  const { mbtiId, children, variant, ...rest } = props;

  const mbtiName = mbtiId ? getMbtiShortName(mbtiId) : '—';
  const mbtiObj = mbti.find((data) => data.id === mbtiId);

  const autonomousVariant = variant
    ? variant
    : ((mbtiObj?.mbtiGroup ? MBTI_GROUPS_NAMES[mbtiObj.mbtiGroup - 1] : 'default') as MbtiGroups);

  return (
    <div
      className={cn(mbtiFrameVariants({ variant: autonomousVariant }))}
      {...rest}
    >
      {children}
      <div className={'w-full text-center text-sm font-medium capitalize text-white dark:text-neutral-100'}>
        {mbtiName}
      </div>
    </div>
  );
};

export default MbtiFrame;
