import React from 'react';
import classNames from 'classnames';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMobileOrLandscape from '../hooks/useIsMobileOrLandscape';
import { ScrollDirectionName, useScrollDirection } from '../hooks/useScrollDirection';

interface MovingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  translateClassName?: string;
  className?: string;
  classNameSpacer?: string;
}

const MovingPanel = (props: MovingPanelProps) => {
  const { children, translateClassName, className, classNameSpacer, ...rest } = props;
  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const scrollDirection = useScrollDirection();

  // Chowanie panelu przy przewijaniu w dół to wzorzec mobilny — tam ekran jest na wagę złota.
  // Na desktopie panel zostaje przyklejony, bo zabierałby wyszukiwarkę i filtry dokładnie
  // wtedy, gdy przegląda się długą galerię.
  const isHidingOnScroll = isMobileLandscape && scrollDirection === ScrollDirectionName.DOWN;
  const computedClass = isHidingOnScroll ? translateClassName : 'translate-y-0';

  return (
    <div
      className={classNames(
        'sticky top-0 z-20 w-full bg-background shadow-panel-bottom-bg transition-transform ',
        {
          'md:-mt-2 md:pt-2': !isMobileLandscape
        },
        computedClass,
        className
      )}
      {...rest}
    >
      {isMobileLandscape && (
        <div
          className={classNames(
            'h-body-start w-full bg-background',
            {
              '!h-12': isLandscape
            },
            classNameSpacer
          )}
        />
      )}
      {children}
    </div>
  );
};

export default MovingPanel;
