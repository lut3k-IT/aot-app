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
  const computedClass = scrollDirection === ScrollDirectionName.DOWN ? translateClassName : 'translate-y-0';

  return (
    <div
      className={classNames(
        'sticky top-0 z-20 w-full bg-background shadow-panel-bottom-bg transition-transform ',
        {
          'md:-mt-2 md:pt-2 md:shadow-panel-bottom-card md:dark:bg-card': !isMobileLandscape
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
