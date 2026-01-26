'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { RoutePath } from '@/constants/enums';

enum TabValue {
  GALLERY = 'gallery',
  CHARTS = 'charts',
  COMPARISON = 'comparison'
}

const tabsTriggerClassName = 'flex-1';

const getTabValueFromPathname = (pathname: string) => {
  if (pathname === RoutePath.CHARTS) {
    return TabValue.CHARTS;
  }
  if (pathname === RoutePath.COMPARISON) {
    return TabValue.COMPARISON;
  }
  return TabValue.GALLERY;
};

interface HeroesLayoutClientProps {
  children: ReactNode;
}

const HeroesLayoutClient = ({ children }: HeroesLayoutClientProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const [currentTab, setCurrentTab] = useState(() => getTabValueFromPathname(pathname));

  useEffect(() => {
    setCurrentTab(getTabValueFromPathname(pathname));
  }, [pathname]);

  return (
    <>
      <MovingPanel
        translateClassName={classNames('-translate-y-[3.5rem]', {
          '!-translate-y-[3rem]': isLandscape
        })}
      >
        <Tabs
          value={currentTab}
          className={classNames('w-full pt-4', {
            'md:pt-0': !isMobileLandscape,
            '!pt-2': isLandscape
          })}
        >
          <TabsList className='flex w-full justify-between'>
            <TabsTrigger
              value={TabValue.GALLERY}
              className={tabsTriggerClassName}
              asChild
            >
              <Link href={RoutePath.HEROES}>{t('common:tab.gallery')}</Link>
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.COMPARISON}
              className={tabsTriggerClassName}
              asChild
            >
              <Link href={RoutePath.COMPARISON}>{t('common:tab.comparison')}</Link>
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.CHARTS}
              className={tabsTriggerClassName}
              asChild
            >
              <Link href={RoutePath.CHARTS}>{t('common:tab.charts')}</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <PageHeading />
      </MovingPanel>
      {children}
    </>
  );
};

export default HeroesLayoutClient;
