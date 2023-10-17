import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import PageHeading from '@/components/ui/PageHeading';
import { RoutePath } from '@/constants';

import MovingPanel from '../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface HeroesProps {
  children?: React.ReactNode;
}

const Heroes = (props: HeroesProps) => {
  const { children } = props;
  const { t } = useTranslation();

  const tabsContentClassName = 'mt-0';

  return (
    <>
      <MovingPanel
        translateClassName={'-translate-y-[56px]'}
        className={'bg-background shadow-white-bottom'}
      >
        <Tabs
          defaultValue='gallery'
          className='w-full'
        >
          <TabsList>
            <TabsTrigger value='gallery'>{t('common:tabs.gallery')}</TabsTrigger>
            <TabsTrigger value='charts'>{t('common:tabs.charts')}</TabsTrigger>
            <TabsTrigger value='comparison'>{t('common:tabs.comparison')}</TabsTrigger>
          </TabsList>
          <TabsContent
            value='gallery'
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.HEROES_GALLERY} />
          </TabsContent>
          <TabsContent
            value='charts'
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.HEROES_CHARTS} />
          </TabsContent>
          <TabsContent
            value='comparison'
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
