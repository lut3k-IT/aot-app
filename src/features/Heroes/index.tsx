'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import PageHeading from '@/components/ui/PageHeading';
import { RoutePath } from '@/constants/enums';

import MovingPanel from '../../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import HeroesCharts from './components/HeroesCharts';
import HeroesComparison from './components/HeroesComparison';
import HeroesGallery from './components/HeroesGallery';

enum TabValue {
  GALLERY = 'gallery',
  CHARTS = 'charts',
  COMPARISON = 'comparison'
}

const tabsContentClassName = 'mt-0';
const tabsTriggerClassName = 'flex-1';

const getTabValueFromPathname = (pathname: string) => {
  if (pathname.includes('/charts')) {
    return TabValue.CHARTS;
  }
  if (pathname.includes('/comparison')) {
    return TabValue.COMPARISON;
  }
  return TabValue.GALLERY;
};

const Heroes = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const [currentTab, setCurrentTab] = useState(() => getTabValueFromPathname(pathname));

  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabValue);
    let targetPath = RoutePath.HEROES;
    if (value === TabValue.CHARTS) {
      targetPath = RoutePath.CHARTS;
    } else if (value === TabValue.COMPARISON) {
      targetPath = RoutePath.COMPARISON;
    }
    router.push(targetPath);
  };

  const handleClearParams = () => {
    const targetPath =
      currentTab === TabValue.GALLERY
        ? RoutePath.HEROES
        : currentTab === TabValue.CHARTS
          ? RoutePath.CHARTS
          : RoutePath.COMPARISON;
    router.push(targetPath);
  };

  useEffect(() => {
    setCurrentTab(getTabValueFromPathname(pathname));
  }, [pathname]);

  const renderContent = () => {
    switch (currentTab) {
      case TabValue.CHARTS:
        return <HeroesCharts />;
      case TabValue.COMPARISON:
        return <HeroesComparison />;
      default:
        return <HeroesGallery />;
    }
  };

  return (
    <>
      <MovingPanel
        translateClassName={classNames('-translate-y-[3.5rem]', {
          '!-translate-y-[3rem]': isLandscape
        })}
      >
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className={classNames('w-full pt-4', {
            'md:pt-0': !isMobileLandscape,
            '!pt-2': isLandscape
          })}
        >
          <TabsList className='flex w-full justify-between'>
            <TabsTrigger
              value={TabValue.GALLERY}
              className={tabsTriggerClassName}
              onClick={handleClearParams}
            >
              {t('common:tab.gallery')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.COMPARISON}
              className={tabsTriggerClassName}
              onClick={handleClearParams}
            >
              {t('common:tab.comparison')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.CHARTS}
              className={tabsTriggerClassName}
              onClick={handleClearParams}
            >
              {t('common:tab.charts')}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={TabValue.GALLERY}
            className={tabsContentClassName}
          />
          <TabsContent
            value={TabValue.CHARTS}
            className={tabsContentClassName}
          />
          <TabsContent
            value={TabValue.COMPARISON}
            className={tabsContentClassName}
          />
        </Tabs>
        <PageHeading />
      </MovingPanel>
      {renderContent()}
    </>
  );
};

export default Heroes;
