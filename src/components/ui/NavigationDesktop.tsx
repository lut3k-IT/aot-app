'use client';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Link from 'next/link';

import { navigationData, NavigationElementProps } from '@/data/navigation';

import useIsMatchingRouteSegment from '../hooks/useIsMatchingRouteSegment';
import Icon from './Icon';

const NavigationElement = (props: NavigationElementProps) => {
  const { data } = props;
  const { t } = useTranslation();

  const isActive = useIsMatchingRouteSegment([data.route, ...(data.relatedRoutes || [])], 2);

  return (
    <Link
      href={data.route}
      className={classNames('flex w-full items-center gap-3 rounded-md px-4 py-2.5', {
        'bg-primary': isActive
      })}
    >
      <div className={'flex justify-center'}>
        <Icon
          name={data.iconName}
          size={'sm'}
          className={classNames('z-30 text-foreground', {
            '!text-primary-foreground': isActive
          })}
        />
      </div>
      <div
        suppressHydrationWarning
        className={classNames('w-full text-lg font-medium leading-none text-foreground', {
          '!text-primary-foreground': isActive
        })}
      >
        {t(data.name)}
      </div>
    </Link>
  );
};

const NavigationDesktop = () => {
  return (
    <nav className='flex w-full flex-col gap-2 bg-background'>
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

export default NavigationDesktop;
