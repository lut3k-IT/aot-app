import React from 'react';
import classNames from 'classnames';

import { cn } from '@/lib/utils';

import useIsMobileLandscape from '../hooks/useIsMobileLandscape';
import { ScrollDirectionName, useScrollDirection } from '../hooks/useScrollDirection';

interface MovingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  translateClassName?: string;
  className?: string;
  classNameSpacer?: string;
}

const MovingPanel = (props: MovingPanelProps) => {
  const { children, translateClassName, className, classNameSpacer, ...rest } = props;
  const isMobileLandscape = useIsMobileLandscape();

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
      {isMobileLandscape && <div className={cn('h-body-start w-full bg-background', classNameSpacer)} />}
      {children}
    </div>
  );
};

export default MovingPanel;
