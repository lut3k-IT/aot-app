import React from 'react';
import { useTranslation } from 'react-i18next';
import { cva, VariantProps } from 'class-variance-authority';

import mbti from '@/data/mbti';
import { cn } from '@/lib/utils';
import { getMbtiGroupName, getMbtiShortName } from '@/utils/dataProcessing';

const mbtiFrameVariants = cva('flex flex-col w-min rounded-md border-2 overflow-hidden', {
  variants: {
    variant: {
      default: 'border-neutral-300 bg-neutral-500 dark:border-neutral-800 dark:bg-neutral-600',
      analysts: 'border-violet-400 bg-violet-500 dark:border-violet-900 dark:bg-violet-800',
      diplomats: 'border-emerald-400 bg-emerald-600 dark:border-emerald-900 dark:bg-emerald-700',
      sentinels: 'border-cyan-400 bg-cyan-600 dark:border-cyan-900 dark:bg-cyan-700',
      explorers: 'border-yellow-300 bg-yellow-500 dark:border-yellow-800 dark:bg-yellow-700'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

type FrameVariantType = 'default' | 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

interface MbtiFrameProps extends VariantProps<typeof mbtiFrameVariants>, React.HTMLAttributes<HTMLDivElement> {
  mbtiId: number | null;
  children: React.ReactNode;
}

const MbtiFrame = (props: MbtiFrameProps) => {
  const { mbtiId, children, variant, ...rest } = props;
  const { t } = useTranslation();

  const mbtiName = mbtiId ? getMbtiShortName(mbtiId) : t('data:mbti.unknown');

  const mbtiObj = mbti.find((data) => data.id === mbtiId);

  const autonomusVariant = variant
    ? variant
    : ((mbtiObj?.mbtiGroup ? getMbtiGroupName(mbtiObj.mbtiGroup) : 'default') as FrameVariantType);

  return (
    <div
      className={cn(mbtiFrameVariants({ variant: autonomusVariant }))}
      {...rest}
    >
      {children}
      <div className={'text-sm text-white dark:text-neutral-100 font-semibold w-full text-center capitalize'}>
        {mbtiName}
      </div>
    </div>
  );
};

export default MbtiFrame;
