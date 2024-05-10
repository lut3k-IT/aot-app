import React from 'react';
import classNames from 'classnames';

import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobile from '@/components/hooks/useIsMobile';

interface DetailsContainerProps {
  children: React.ReactNode;
}

const DetailsContainer = ({ children }: DetailsContainerProps) => {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();

  return (
    <div
      className={classNames({
        'pt-body-pad-start': isMobile,
        'pt-16': isLandscape
      })}
    >
      {children}
    </div>
  );
};

export default DetailsContainer;
