import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import PageHeading from '@/components/ui/PageHeading';
import { RoutePath } from '@/constants';
import { getCurrentRoute } from '@/utils/helpers';

import MovingPanel from '../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';

enum TabValue {
  GALLERY = 'gallery',
  CHARTS = 'charts',
  COMPARISON = 'comparison'
}

interface HeroesProps {
  children?: React.ReactNode;
}

const Heroes = (props: HeroesProps) => {
  const { children } = props;
  const { t } = useTranslation();

  const defaultValueBasedOnTheRoute = () => {
    const route = getCurrentRoute();

    switch (route) {
      case RoutePath.HEROES_GALLERY:
        return TabValue.GALLERY;
      case RoutePath.HEROES_CHARTS:
        return TabValue.CHARTS;
      case RoutePath.HEROES_COMPARISON:
        return TabValue.COMPARISON;
      default:
        return TabValue.GALLERY;
    }
  };

  const tabsContentClassName = 'mt-0';
  const tabsTriggerClassName = 'flex-1';

  return (
    <>
      <MovingPanel
        translateClassName={'-translate-y-[56px]'}
        // className={'shadow-white-bottom dark:shadow-black-bottom'}
      >
        <Tabs
          defaultValue={defaultValueBasedOnTheRoute()}
          className='w-full pt-4'
          // className='w-full flex justify-center'
        >
          <TabsList className='w-full flex justify-between'>
            <TabsTrigger
              value={TabValue.GALLERY}
              className={tabsTriggerClassName}
            >
              {t('common:tabs.gallery')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.CHARTS}
              className={tabsTriggerClassName}
            >
              {t('common:tabs.charts')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.COMPARISON}
              className={tabsTriggerClassName}
            >
              {t('common:tabs.comparison')}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={TabValue.GALLERY}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.HEROES_GALLERY} />
          </TabsContent>
          <TabsContent
            value={TabValue.CHARTS}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.HEROES_CHARTS} />
          </TabsContent>
          <TabsContent
            value={TabValue.COMPARISON}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.HEROES_COMPARISON} />
          </TabsContent>
        </Tabs>
        <PageHeading />
      </MovingPanel>
      <Outlet />
    </>
  );
};

export default Heroes;
