import React from 'react';

import { cn } from '@/lib/utils';

const DEFAULT_MIN_COLUMN = '20rem';

interface GalleryWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * Minimalna szerokość kolumny siatki. Szablon kolumn idzie stylem, a nie klasą —
   * arbitralne `grid-template-columns` w Tailwindzie nie daje się przewidywalnie
   * nadpisać z zewnątrz.
   */
  minColumnWidth?: string;
}

const GalleryWrapper = (props: GalleryWrapperProps) => {
  const { children, className, minColumnWidth = DEFAULT_MIN_COLUMN, style, ...rest } = props;

  return (
    <div
      className={cn('grid gap-4', className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GalleryWrapper;
