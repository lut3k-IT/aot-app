import React from 'react';
import classNames from 'classnames';

import useIsMobile from '../hooks/useIsMobile';
import { ScrollDirectionName, useScrollDirection } from '../hooks/useScrollDirection';

interface MovingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  translateClassName?: string;
  className?: string;
  classNameSpacer?: string;
}

const MovingPanel = (props: MovingPanelProps) => {
  const { children, translateClassName = '', className = '', classNameSpacer = '', ...rest } = props;
  const isMobile = useIsMobile();

  const scrollDirection = useScrollDirection();
  const computedClass = scrollDirection === ScrollDirectionName.DOWN ? translateClassName : 'translate-y-0';

  return (
    <div
      className={classNames(
        'sticky top-0 z-20 w-full bg-background shadow-panel-bottom transition-transform',
        computedClass,
        className,
        {
          '-mt-2 pt-2': !isMobile
        }
      )}
      {...rest}
    >
      {isMobile && <div className={classNames('h-body-start w-full bg-background', classNameSpacer)} />}
      {children}
    </div>
  );
};

export default MovingPanel;
