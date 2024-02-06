import { Outlet } from 'react-router-dom';

import useIsMobile from '../hooks/useIsMobile';
import { Card } from './Card';
import NavigationMobile from './NavigationMobile';
import QuotationBarMobile from './QuotationBarMobile';
import { ScrollArea } from './ScrollArea';
import SidebarDesktop from './SidebarDesktop';
import TopBarMobile from './TopBarMobile';

const PageOverlay = () => {
  const isMobile = useIsMobile();

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

  const DesktopOverlay = () => (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'relative grid h-full grid-cols-[16.75rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={''}>
          {/* <QuotationBarDesktop /> */}
          {/* @todo obliczyć wysokosc 100vh odejmujac male przestrzenie i dodac do konfiguracji tailwind */}
          <Card className={'h-[calc(100svh-100px)] p-4'}>
            <ScrollArea
              id='inner'
              className={'-mr-9 h-full pr-9'}
            >
              <div className={'p-2'}>
                <CommonOutlet />
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileOverlay /> : <DesktopOverlay />;

  // return (
  //   <>
  //     {isMobile ? <TopBarMobile /> : <></>}
  //     {isMobile && <QuotationBarMobile />}
  //     <div
  //       id='inner'
  //       className={'pb-body-pad-end [&>*]:px-4'}
  //     >
  //       <Outlet />
  //     </div>
  //     {isMobile ? <NavigationMobile /> : <SidebarDesktop />}
  //   </>
  // );
};

export default PageOverlay;
