import { cn } from '@/lib/utils';
import React from 'react';

interface GalleryWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const GalleryWrapper = (props: GalleryWrapperProps) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn('w-full flex flex-col gap-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GalleryWrapper;
