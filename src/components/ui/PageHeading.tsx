import { ElementsIds } from '@/constants/enums';

interface PageHeadingProps {}

export const filterDestination = document.getElementById(ElementsIds.PAGE_HEADING_OPTIONS);

const PageHeading = (props: PageHeadingProps) => {
  const {} = props;

  return (
    <div className={'flex justify-between items-center sticky py-4 mb-2 bg-background'}>
      <div className={'font-bold text-4xl text-neutral-300 dark:text-neutral-700 leading-none tracking-wide'}>
        Year 854
      </div>
      <div id={ElementsIds.PAGE_HEADING_OPTIONS} />
    </div>
  );
};

export default PageHeading;
