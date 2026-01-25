'use client';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Link from 'next/link';

import { navigationData, NavigationElementProps } from '@/data/navigation';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMatchingRouteSegment from '../hooks/useIsMatchingRouteSegment';
import Icon from './Icon';

const NavigationElement = (props: NavigationElementProps) => {
  const { data } = props;
  const { t } = useTranslation();
  const isActive = useIsMatchingRouteSegment([data.route, ...(data.relatedRoutes || [])], 2);

  return (
    <Link
      href={data.route}
      className={'flex w-16 flex-col gap-1 pb-3 pt-4 align-middle'}
    >
      <div className={'relative flex justify-center'}>
        <Icon
          name={data.iconName}
          size={'sm'}
          className={classNames('z-30 text-muted-foreground', {
            '!text-primary-foreground': isActive
          })}
        />
        <div
          className={classNames('absolute -top-0.5 h-[1.5rem] w-12 rounded-full bg-primary transition-all', {
            '!w-6 !bg-background': !isActive
          })}
        />
      </div>
      <div
        suppressHydrationWarning
        className={classNames('w-full text-center text-xs font-medium leading-none text-muted-foreground transition', {
          'translate-y-0.5 !text-foreground': isActive
        })}
      >
        {t(data.name)}
      </div>
    </Link>
  );
};

const NavigationMobile = () => {
  const isLandscape = useIsLandscape();

  return (
    <nav
      className={classNames('fixed bottom-0 z-40 flex w-full justify-evenly border-t bg-background', {
        'left-0 top-0 h-[100vh] !w-20 flex-col items-center border-r border-t-0': isLandscape
      })}
    >
      {navigationData.map((element) => {
        return (
          <NavigationElement
            key={element.id}
            data={element}
          />
        );
      })}
    </nav>
  );
};

export default NavigationMobile;
