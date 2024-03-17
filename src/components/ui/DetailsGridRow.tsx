import React from 'react';

interface DetailsGridRowProps {
  title: string;
  value?: React.ReactNode;
}
export const DetailsGridRow = (props: DetailsGridRowProps) => {
  const { title, value = '-' } = props;

  return (
    <div className={'flex-center flex flex-col gap-1 rounded-md bg-muted p-2'}>
      <div className={'text-center font-bold text-muted-foreground'}>{title}</div>
      <div className={'flex-1 text-center text-lg'}>{value}</div>
    </div>
  );
};
