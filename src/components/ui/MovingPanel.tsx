import React from 'react';

import { ScrollDirectionName, useScrollDirection } from '../hooks/useScrollDirection';

interface MovingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  translateClassName?: string;
  className?: string;
  classNameSpacer?: string;
}

const MovingPanel = (props: MovingPanelProps) => {
  const { children, translateClassName = '', className = '', classNameSpacer = '', ...rest } = props;

  const scrollDirection = useScrollDirection();
  const computedClass = scrollDirection === ScrollDirectionName.DOWN ? translateClassName : 'translate-y-0';

  return (
    <div
      className={`w-full sticky top-0 z-10 transition-transform ${computedClass} ${className}`}
      {...rest}
    >
      <div className={`w-full h-[100px] bg-background ${classNameSpacer}`} />
      {children}
    </div>
  );
};

export default MovingPanel;
