import { ElementsIds } from '@/constants/enums';

const PageHeading = () => {
  return (
    <div className={'sticky mb-2 flex items-center justify-between bg-background py-4'}>
      <div className={'text-4xl font-bold leading-none tracking-wide text-neutral-300 dark:text-neutral-700'}>
        Year 854
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
