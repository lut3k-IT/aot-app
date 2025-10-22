import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobileOrLandscape from '@/components/hooks/useIsMobileOrLandscape';
import PageHeading from '@/components/ui/PageHeading';
import { RoutePath } from '@/constants/enums';
import { matchPath } from 'react-router-dom';

import MovingPanel from '../../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

enum TabValue {
  GALLERY = 'gallery',
  CHARTS = 'charts',
  COMPARISON = 'comparison'
}

const tabsContentClassName = 'mt-0';
const tabsTriggerClassName = 'flex-1';

const getTabValueFromPathname = (pathname: string) => {
  if (matchPath(RoutePath.HEROES_CHARTS, pathname)) {
    return TabValue.CHARTS;
  }
  if (matchPath(RoutePath.HEROES_COMPARISON, pathname)) {
    return TabValue.COMPARISON;
  }
  return TabValue.GALLERY;
};

const Heroes = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isMobileLandscape = useIsMobileOrLandscape();
  const isLandscape = useIsLandscape();

  const [currentTab, setCurrentTab] = useState(() => getTabValueFromPathname(location.pathname));
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = createSearchParams(searchParams);

  const handleClearParams = () => {
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    setCurrentTab(getTabValueFromPathname(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <MovingPanel
        translateClassName={classNames('-translate-y-[3.5rem]', {
          '!-translate-y-[3rem]': isLandscape
        })}
      >
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as TabValue)}
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
          >
            <Navigate to={`${RoutePath.HEROES_GALLERY}?${searchParamsString}`} />
          </TabsContent>
          <TabsContent
            value={TabValue.CHARTS}
            className={tabsContentClassName}
          >
            <Navigate to={`${RoutePath.HEROES_CHARTS}?${searchParamsString}`} />
          </TabsContent>
          <TabsContent
            value={TabValue.COMPARISON}
            className={tabsContentClassName}
          >
            <Navigate to={`${RoutePath.HEROES_COMPARISON}?${searchParamsString}`} />
          </TabsContent>
        </Tabs>
        <PageHeading />
      </MovingPanel>
      <Outlet />
    </>
  );
};

export default Heroes;
