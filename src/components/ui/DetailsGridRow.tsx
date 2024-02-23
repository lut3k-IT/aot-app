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
          'text-md h-full w-full break-words rounded-md bg-muted px-3 py-1 text-center font-bold uppercase leading-5 text-muted-foreground'
        }
      >
        {title}
      </div>
      <div className={'-mt-0.5 w-full self-center text-lg'}>{value}</div>
    </>
  );
};
