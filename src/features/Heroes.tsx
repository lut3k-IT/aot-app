import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath } from '@/constants';

import MovingPanel from '../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface HeroesProps {
  children?: React.ReactNode;
}

const Heroes = (props: HeroesProps) => {
  const { children } = props;

  return (
    <>
      <MovingPanel
        translateClassName={'-translate-y-20'}
        className={'bg-background'}
      >
        <Tabs
          defaultValue='gallery'
          className='w-full pb-2'
        >
          <TabsList>
            <TabsTrigger value='gallery'>Gallery</TabsTrigger>
            <TabsTrigger value='charts'>Charts</TabsTrigger>
            <TabsTrigger value='comparison'>Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value='gallery'>
            <Navigate to={RoutePath.HEROES_GALLERY} />
          </TabsContent>
          <TabsContent value='charts'>
            <Navigate to={RoutePath.HEROES_CHARTS} />
          </TabsContent>
          <TabsContent value='comparison'>
            <Navigate to={RoutePath.HEROES_COMPARISON} />
          </TabsContent>
        </Tabs>
      </MovingPanel>

      <Outlet />
    </>
  );
};

export default Heroes;
