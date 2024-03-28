import React from 'react';
import classNames from 'classnames';

import useIsLandscape from '@/components/hooks/useIsLandscape';

interface MobileBarWrapperProps {
  children: React.ReactNode;
}

const MobileBarWrapper: React.FC<MobileBarWrapperProps> = ({ children }) => {
  const isLandscape = useIsLandscape();

  return (
    <div
      className={classNames(
        'fixed top-12 z-30 flex h-9 w-full items-center justify-between gap-2 border-b bg-background px-[1.375rem] py-1',
        {
          'w-[calc(100vw-5rem)]': isLandscape
        }
      )}
    >
      {children}
    </div>
  );
};

export default MobileBarWrapper;
