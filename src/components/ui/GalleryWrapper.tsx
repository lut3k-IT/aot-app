import React from 'react';

import { cn } from '@/lib/utils';

export const GALLERY_MIN_COLUMN = '20rem';

interface GalleryWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * Minimalna szerokość kolumny siatki. `null` wymusza jedną kolumnę (widok listy).
   * Szablon kolumn idzie stylem, a nie klasą — arbitralne `grid-template-columns`
   * w Tailwindzie nie daje się przewidywalnie nadpisać z zewnątrz.
   */
  minColumnWidth?: string | null;
}

const GalleryWrapper = (props: GalleryWrapperProps) => {
  const { children, className, minColumnWidth = GALLERY_MIN_COLUMN, style, ...rest } = props;

  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: minColumnWidth ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))` : '1fr',
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GalleryWrapper;
