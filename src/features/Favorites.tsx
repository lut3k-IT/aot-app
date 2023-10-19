import MovingPanel from '@/components/ui/MovingPanel';
import PageHeading from '@/components/ui/PageHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { RoutePath } from '@/constants';
import { getCurrentRoute } from '@/utils/helpers';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

enum TabValue {
  HEROES = 'heroes',
  TITANS = 'titans',
  QUOTATIONS = 'quotations'
}

interface FavoritesProps {
  children?: React.ReactNode;
}

const Favorites = (props: FavoritesProps) => {
  const { children } = props;
  const { t } = useTranslation();

  const defaultValueBasedOnTheRoute = () => {
    const route = getCurrentRoute();

    switch (route) {
      case RoutePath.FAVORITES_HEROES:
        return TabValue.HEROES;
      case RoutePath.FAVORITES_TITANS:
        return TabValue.TITANS;
      case RoutePath.FAVORITES_QUOTATIONS:
        return TabValue.QUOTATIONS;
      default:
        return TabValue.HEROES;
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
              value={TabValue.HEROES}
              className={tabsTriggerClassName}
            >
              {t('common:title.heroes')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.TITANS}
              className={tabsTriggerClassName}
            >
              {t('common:title.titans')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.QUOTATIONS}
              className={tabsTriggerClassName}
            >
              {t('common:title.quotations')}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={TabValue.HEROES}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.FAVORITES_HEROES} />
          </TabsContent>
          <TabsContent
            value={TabValue.TITANS}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.FAVORITES_TITANS} />
          </TabsContent>
          <TabsContent
            value={TabValue.QUOTATIONS}
            className={tabsContentClassName}
          >
            <Navigate to={RoutePath.FAVORITES_QUOTATIONS} />
          </TabsContent>
        </Tabs>
        <PageHeading />
      </MovingPanel>
      <Outlet />
    </>
  );
};

export default Favorites;
