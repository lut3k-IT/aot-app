import { useTranslation } from 'react-i18next';
import { createSearchParams, Navigate, Outlet, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import useIsLandscape from '@/components/hooks/useIsLandscape';
import useIsMobileLandscape from '@/components/hooks/useIsMobileLandscape';
import PageHeading from '@/components/ui/PageHeading';
import { RoutePath } from '@/constants/enums';
import { getCurrentRoute } from '@/utils/helpers';

import MovingPanel from '../../components/ui/MovingPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

enum TabValue {
  GALLERY = 'gallery',
  CHARTS = 'charts',
  COMPARISON = 'comparison'
}

const tabsContentClassName = 'mt-0';
const tabsTriggerClassName = 'flex-1';

const Heroes = () => {
  const { t } = useTranslation();
  const isMobileLandscape = useIsMobileLandscape();
  const isLandscape = useIsLandscape();

  const [searchParams] = useSearchParams();
  const searchParamsString = createSearchParams(searchParams);

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

  const handleClearParams = () => {
    searchParams.forEach((_, key) => {
      searchParams.delete(key);
    });
  };

  return (
    <>
      <MovingPanel
        translateClassName={classNames('-translate-y-[3.5rem]', {
          '!-translate-y-[3rem]': isLandscape
        })}
      >
        <Tabs
          defaultValue={defaultValueBasedOnTheRoute()}
          className={classNames('w-full pt-4', {
            'md:pt-0': !isMobileLandscape,
            '!pt-2': isLandscape
          })}
        >
          <TabsList
            className='flex w-full justify-between'
            onClick={handleClearParams}
          >
            <TabsTrigger
              value={TabValue.GALLERY}
              className={tabsTriggerClassName}
            >
              {t('common:tab.gallery')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.COMPARISON}
              className={tabsTriggerClassName}
            >
              {t('common:tab.comparison')}
            </TabsTrigger>
            <TabsTrigger
              value={TabValue.CHARTS}
              className={tabsTriggerClassName}
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
