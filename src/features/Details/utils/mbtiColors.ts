import { MbtiGroups } from '@/constants/types';

interface MbtiGroupClasses {
  bg: string;
  bgSubtle: string;
  border: string;
  text: string;
  ring: string;
  gradient: string;
}

const mbtiGroupClassMap: Record<MbtiGroups, MbtiGroupClasses> = {
  analysts: {
    bg: 'bg-violet-500 dark:bg-violet-500/50',
    bgSubtle: 'bg-violet-500/10 dark:bg-violet-500/20',
    border: 'border-violet-400 dark:border-violet-400/30',
    text: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-400/50 dark:ring-violet-400/30',
    gradient: 'from-violet-500/90 dark:from-violet-500/60'
  },
  diplomats: {
    bg: 'bg-emerald-600 dark:bg-emerald-700',
    bgSubtle: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    border: 'border-emerald-400 dark:border-emerald-900',
    text: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-400/50 dark:ring-emerald-900/50',
    gradient: 'from-emerald-600/90 dark:from-emerald-700/60'
  },
  sentinels: {
    bg: 'bg-cyan-600 dark:bg-cyan-700',
    bgSubtle: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    border: 'border-cyan-400 dark:border-cyan-900',
    text: 'text-cyan-600 dark:text-cyan-400',
    ring: 'ring-cyan-400/50 dark:ring-cyan-900/50',
    gradient: 'from-cyan-600/90 dark:from-cyan-700/60'
  },
  explorers: {
    bg: 'bg-yellow-400 dark:bg-yellow-600/70',
    bgSubtle: 'bg-yellow-400/10 dark:bg-yellow-500/20',
    border: 'border-yellow-300 dark:border-yellow-500/30',
    text: 'text-yellow-600 dark:text-yellow-400',
    ring: 'ring-yellow-300/50 dark:ring-yellow-500/30',
    gradient: 'from-yellow-400/90 dark:from-yellow-600/60'
  },
  default: {
    bg: 'bg-neutral-400 dark:bg-neutral-500/50',
    bgSubtle: 'bg-neutral-400/10 dark:bg-neutral-500/20',
    border: 'border-neutral-300 dark:border-neutral-500/30',
    text: 'text-neutral-500 dark:text-neutral-400',
    ring: 'ring-neutral-300/50 dark:ring-neutral-500/30',
    gradient: 'from-neutral-400/90 dark:from-neutral-500/60'
  }
};

export const getMbtiGroupClasses = (group: MbtiGroups): MbtiGroupClasses => {
  return mbtiGroupClassMap[group] || mbtiGroupClassMap.default;
};
