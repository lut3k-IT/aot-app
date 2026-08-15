import React from 'react';
import classNames from 'classnames';

import { useLayoutVariant } from '@/components/providers/LayoutVariantProvider';
import { isOpenShellVariant } from '@/constants/layoutVariants';

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

  const { variant } = useLayoutVariant();
  const isOpenShell = isOpenShellVariant(variant);

  const scrollDirection = useScrollDirection();

  // W otwartej powłoce panel zostaje przyklejony na stałe. Chowanie go przy przewijaniu
  // zabierałoby wyszukiwarkę i filtry dokładnie wtedy, gdy przegląda się długą galerię.
  const isHidingOnScroll = !isOpenShell && scrollDirection === ScrollDirectionName.DOWN;
  const computedClass = isHidingOnScroll ? translateClassName : 'translate-y-0';

  return (
    <div
      className={classNames(
        'sticky top-0 z-20 w-full bg-background shadow-panel-bottom-bg transition-transform ',
        {
          // Tło karty tylko wtedy, gdy treść faktycznie leży na karcie.
          'md:-mt-2 md:pt-2 md:shadow-panel-bottom-card md:dark:bg-card': !isMobileLandscape && !isOpenShell,
          'md:-mt-2 md:pt-2': !isMobileLandscape && isOpenShell
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
