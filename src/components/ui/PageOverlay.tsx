import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import { ExternalUrl, RoutePath } from '@/constants/enums';

import useIsMobile from '../hooks/useIsMobile';
import { Card } from './Card';
import NavigationMobile from './NavigationMobile';
import QuotationBarMobile from './QuotationBarMobile';
import { ScrollArea, ScrollBar } from './ScrollArea';
import SidebarDesktop from './SidebarDesktop';
import { Toaster } from './Toaster';
import TopBarMobile from './TopBarMobile';

const PageOverlay = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // @audit - it shouldn't rerender the entire component
  const CommonOutlet = () => <Outlet />;

  const MobileOverlay = () => (
    <>
      <TopBarMobile />
      <QuotationBarMobile />
      <div
        id='inner'
        className={'pb-body-pad-end [&>*]:px-4'}
      >
        <CommonOutlet />
      </div>
      <NavigationMobile />
      <Toaster />
    </>
  );

  // @todo - make more configuration and apply DRY principle and utility first approach (classes)

  const DesktopOverlay = () => (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'grid h-full grid-cols-[15rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={'grid h-[calc(100svh-3rem)] grid-rows-[2.5rem_1fr_1.25rem] gap-6'}>
          <QuotationBarMobile />
          <Card className={'h-full overflow-hidden p-4'}>
            <ScrollArea
              id='inner'
              className={'-mr-3 h-full pr-3'}
            >
              <div className={'p-2'}>
                <CommonOutlet />
              </div>
            </ScrollArea>
          </Card>
          {/* @todo move to separate component - maybe make it common for mobile too */}
          <ScrollArea className={'h-5 w-full whitespace-nowrap px-4'}>
            <div
              className={
                'mx-auto flex w-full max-w-[35rem] items-center justify-between gap-4  [&>*:hover]:underline [&>*]:text-sm [&>*]:text-muted-foreground'
              }
            >
              <Link to={RoutePath.ABOUT}>{t('common:title.about')}</Link>
              <Link to={RoutePath.CHANGELOG}>{t('common:title.changelog')}</Link>
              <Link to={RoutePath.PRIVACY_POLICY}>{t('common:title.privacyPolicy')}</Link>
              <Link to={RoutePath.TERMS_OF_SERVICE}>{t('common:title.termsOfService')}</Link>
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

  return isMobile ? <MobileOverlay /> : <DesktopOverlay />;
};

export default PageOverlay;
