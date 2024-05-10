import classNames from 'classnames';

interface MBTIBarProps {
  mbtiGroupName: string;
}

const MBTIBar = ({ mbtiGroupName }: MBTIBarProps) => {
  return (
    <div
      className={classNames('absolute h-[7.5rem] w-full rounded-lg', {
        'bg-neutral-400': mbtiGroupName === 'default',
        'bg-violet-500': mbtiGroupName === 'analysts',
        'bg-emerald-600': mbtiGroupName === 'diplomats',
        'bg-cyan-600': mbtiGroupName === 'sentinels',
        'bg-yellow-400': mbtiGroupName === 'explorers'
      })}
    />
  );
};

export default MBTIBar;
