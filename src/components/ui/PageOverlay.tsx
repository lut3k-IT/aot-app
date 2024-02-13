import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { ExternalUrl, RoutePath } from '@/constants/enums';

import useIsMobile from '../hooks/useIsMobile';
import { Button } from './Button';
import { Card } from './Card';
import NavigationMobile from './NavigationMobile';
import QuotationBarMobile from './QuotationBarMobile';
import { ScrollArea } from './ScrollArea';
import SidebarDesktop from './SidebarDesktop';
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
    </>
  );

  // @todo - make more configuration and apply DRY principle and utility first approach (classes)

  const DesktopOverlay = () => (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'grid h-full grid-cols-[15rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={'grid h-[calc(100svh-64px)] grid-rows-[2.5rem_1fr_1.5rem] gap-6'}>
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
          <div className={'flex-center flex-wrap [&_*]:text-muted-foreground'}>
            {/* <a
              href={ExternalUrl.PORTFOLIO}
              target='_blank'
              rel='noreferrer'
              className={'text-sm hover:underline'}
            >
              {t('common:title.portfolio')}
            </a> */}
            <Button
              variant={'link'}
              linkTo={RoutePath.ABOUT}
            >
              {t('common:title.about')}
            </Button>
            <Button
              variant={'link'}
              linkTo={RoutePath.CHANGELOG}
            >
              {t('common:title.changelog')}
            </Button>
            <Button
              variant={'link'}
              linkTo={RoutePath.PRIVACY_POLICY}
            >
              {t('common:title.privacyPolicy')}
            </Button>
            <Button
              variant={'link'}
              linkTo={RoutePath.TERMS_OF_SERVICE}
            >
              {t('common:title.termsOfService')}
            </Button>
            <Button
              variant={'link'}
              linkTo={ExternalUrl.PORTFOLIO}
            >
              {t('common:title.portfolio')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileOverlay /> : <DesktopOverlay />;
};

export default PageOverlay;
