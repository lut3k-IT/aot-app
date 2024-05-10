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
      className={cn('grid gap-4 [grid-template-columns:_repeat(auto-fit,_minmax(20rem,_1fr))]', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GalleryWrapper;
