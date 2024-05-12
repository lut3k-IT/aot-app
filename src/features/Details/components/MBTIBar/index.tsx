import classNames from 'classnames';

interface MBTIBarProps {
  mbtiGroupName: string;
}

const MBTIBar = ({ mbtiGroupName }: MBTIBarProps) => {
  return (
    <div
      className={classNames('absolute h-[7.5rem] w-full rounded-lg', {
        'bg-neutral-400 dark:bg-neutral-500/50': mbtiGroupName === 'default',
        'bg-violet-500 dark:bg-violet-500/50': mbtiGroupName === 'analysts',
        'bg-emerald-600 dark:bg-emerald-700': mbtiGroupName === 'diplomats',
        'bg-cyan-600 dark:bg-cyan-700': mbtiGroupName === 'sentinels',
        'bg-yellow-400 dark:bg-yellow-600/70': mbtiGroupName === 'explorers'
      })}
    />
  );
};

export default MBTIBar;
