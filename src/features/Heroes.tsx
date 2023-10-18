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
  const tabsTriggerClassName = 'flex-1';

  return (
    <>
      <MovingPanel
        translateClassName={'-translate-y-[56px]'}
        className={'bg-background shadow-white-bottom dark:shadow-black-bottom'}
      >
        <Tabs
          defaultValue='gallery'
          className='w-full'
          // className='w-full flex justify-center'
        >
          <TabsList className='w-full flex justify-between'>
            {/* <TabsList> */}
            <TabsTrigger
              value='gallery'
              className={tabsTriggerClassName}
            >
              {t('common:tabs.gallery')}
            </TabsTrigger>
            <TabsTrigger
              value='charts'
              className={tabsTriggerClassName}
            >
              {t('common:tabs.charts')}
            </TabsTrigger>
            <TabsTrigger
              value='comparison'
              className={tabsTriggerClassName}
            >
              {t('common:tabs.comparison')}
            </TabsTrigger>
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
