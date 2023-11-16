import React from 'react';

interface DetailsGridRowProps {
  title: string;
  value?: React.ReactNode;
}
export const DetailsGridRow = (props: DetailsGridRowProps) => {
  const { title, value = '-' } = props;

  return (
    <>
      <div
        className={
          'w-full bg-muted text-muted-foreground text-md uppercase px-2 py-0.5 rounded-md text-center font-bold'
        }
      >
        {title}
      </div>
      <div className={'w-full self-center text-lg -mt-0.5'}>{value}</div>
    </>
  );
};
