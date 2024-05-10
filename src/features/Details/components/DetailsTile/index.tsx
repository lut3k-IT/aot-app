import React from 'react';
import classNames from 'classnames';

import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';

interface DetailsTileProps {
  title: string;
  value?: React.ReactNode;
  span?: number;
}

const DetailsTile = (props: DetailsTileProps) => {
  const { title, value = '-', span } = props;
  const isMobile = useIsMobileOrLandscape();

  return (
    <div
      className={classNames('flex-center flex flex-col gap-2 rounded-md bg-muted p-4', {
        [`col-span-${span}`]: span,
        '!p-2': isMobile
      })}
    >
      <div className={'text-center font-bold text-muted-foreground'}>{title}</div>
      <div className={'flex-1 text-center text-lg'}>{value}</div>
    </div>
  );
};

export default DetailsTile;
