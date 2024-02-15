import React from 'react';
import classNames from 'classnames';

interface DetailItemProps {
  title: string;
  value?: React.ReactNode;
  isFirstColumn?: boolean;
  isLastColumn?: boolean;
  isOddRow?: boolean;
}

const DetailItem = (props: DetailItemProps) => {
  const { title, value, isFirstColumn, isLastColumn, isOddRow } = props;

  return (
    <div
      className={classNames('h-min-[3.75rem] relative flex h-full w-full flex-col items-center gap-1 px-2 ', {
        'py-3': !isOddRow,
        'bg-accent py-2': isOddRow,
        'rounded-s-md': isFirstColumn,
        'rounded-e-md': isLastColumn
      })}
    >
      <div className={'text-base font-bold leading-none text-muted-foreground'}>{title}</div>
      <div className={'break-words text-center text-lg leading-6'}>{value || '-'}</div>
    </div>
  );
};

export default DetailItem;
