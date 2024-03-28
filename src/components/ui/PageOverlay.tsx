import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { ExternalUrl, RoutePath } from '@/constants/enums';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMobile from '../hooks/useIsMobile';
import useIsMobileOrLandscape from '../hooks/useIsMobileOrLandscape';
import { Card } from './Card';
import NavigationMobile from './NavigationMobile';
import QuotationBar from './QuotationBar';
import { ScrollArea, ScrollBar } from './ScrollArea';
import SidebarDesktop from './SidebarDesktop';
import { Toaster } from './Toaster';
import TopBarMobile from './TopBarMobile';

const MobileOverlay = () => {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isLandscape ? 'ml-20' : 'ml-0'}>
      <TopBarMobile />
      <QuotationBar />
      <div
        id='inner'
        className={classNames('[&>*]:px-4', {
          'pb-body-pad-end': isMobile && !isLandscape,
          'pb-4': isMobileLandscape
        })}
      >
        {/* @audit - it shouldn't rerender the entire component, but only the part that changes */}
        <Outlet />
      </div>
      <NavigationMobile />
      <Toaster />
    </div>
  );
};

// @todo - make more configuration and apply DRY principle and utility first approach (classes)
const DesktopOverlay = () => {
  const { t } = useTranslation();

  return (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'grid h-full grid-cols-[15rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={'grid h-[calc(100svh-3rem)] grid-rows-[2.5rem_1fr_1.25rem] gap-6'}>
          <QuotationBar />
          <Card className={'h-full overflow-hidden p-4'}>
            <ScrollArea
              id='inner'
              className={'-mr-3 h-full pr-3'}
            >
              <div className={'p-2'}>
                <Outlet />
              </div>
            </ScrollArea>
          </Card>
          {/* @todo move to separate component - maybe make it common for mobile too */}
          <ScrollArea className={'h-5 w-full whitespace-nowrap px-4'}>
            <div
              className={
                'mx-auto flex w-full items-center justify-center gap-8 [&>*:hover]:underline [&>*]:text-sm [&>*]:text-muted-foreground'
              }
            >
              <Link to={RoutePath.ABOUT}>{t('common:title.about')}</Link>
              {/* <Link to={RoutePath.CHANGELOG}>{t('common:title.changelog')}</Link>
            <Link to={RoutePath.PRIVACY_POLICY}>{t('common:title.privacyPolicy')}</Link> */}
              <Link to={RoutePath.TERMS_OF_SERVICE}>{t('common:title.termsAndConditions')}</Link>
              <a
                href={ExternalUrl.PORTFOLIO}
                target='_blank'
                rel='noreferrer'
                className={'text-sm hover:underline'}
              >
                {t('common:title.portfolio')}
              </a>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const PageOverlay = () => {
  const isMobileLandscape = useIsMobileOrLandscape();
  return isMobileLandscape ? <MobileOverlay /> : <DesktopOverlay />;
};

export default PageOverlay;
