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

  // @todo - make more configuration and apply DRY principle and utility first approach (classes)

  const DesktopOverlay = () => (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'relative grid h-full grid-cols-[16.75rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={'grid h-[calc(100svh-64px)] w-full grid-rows-[100px_1fr_24px] gap-6'}>
          {/* <QuotationBarDesktop /> */}
          <div>temp quotation bar</div>
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
          <div>temp footer</div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileOverlay /> : <DesktopOverlay />;
};

export default PageOverlay;
