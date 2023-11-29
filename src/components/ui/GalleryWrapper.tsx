import React from 'react';

import { cn } from '@/lib/utils';

interface GalleryWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const GalleryWrapper = (props: GalleryWrapperProps) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn('flex flex-col gap-4', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GalleryWrapper;
