import React from 'react';

const RowHighlighter = () => (
  <div className={'w-screen-pad absolute left-0 top-0 -z-10 h-[140%] -translate-y-[14%] rounded-md bg-accent'} />
);

interface DetailItemProps {
  title: string;
  value?: React.ReactNode;
  isOdd?: boolean;
}

const DetailItem = (props: DetailItemProps) => {
  const { title, value, isOdd } = props;

  return (
    <div className={'h-min-[3.75rem] relative flex h-full w-full flex-col items-center gap-1 px-2'}>
      <div className={'text-base font-bold leading-none text-muted-foreground'}>{title}</div>
      <div className={'break-words text-center text-lg leading-6'}>{value || '-'}</div>
      {isOdd && <RowHighlighter />}
    </div>
  );
};

export default DetailItem;
