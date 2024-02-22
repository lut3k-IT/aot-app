import { Skeleton } from './Skeleton';

const CharacterCardSkeleton = () => {
  return (
    <div className={'flex h-27 gap-4'}>
      <Skeleton className={'w-[88px]'} />
      <div className={'flex flex-1 flex-col justify-between'}>
        <div className={'relative mt-0.5 flex w-full flex-col gap-1'}>
          <Skeleton className={'h-4 w-32'} />
          <Skeleton className={'h-3 w-20'} />
        </div>
        <Skeleton className={'h-13 w-full rounded-md'} />
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;
