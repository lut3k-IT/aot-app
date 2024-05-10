import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import useIsLandscape from '../../hooks/useIsLandscape';
import useIsMobile from '../../hooks/useIsMobile';
import useIsMobileOrLandscape from '../../hooks/useIsMobileOrLandscape';
import { Card } from '../Card';
import NavigationMobile from '../NavigationMobile';
import QuotationBar from '../QuotationBar';
import { ScrollArea } from '../ScrollArea';
import SidebarDesktop from '../SidebarDesktop';
import { Toaster } from '../Toaster';
import TopBarMobile from '../TopBarMobile';
import Footer from './components/Footer';

const MobileOverlay = () => {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();
  const isMobileLandscape = useIsMobileOrLandscape();

  return (
    <div className={isLandscape ? 'ml-20' : 'ml-0'}>
      <TopBarMobile />
      <QuotationBar />
      <main
        id='inner'
        className={classNames('[&>*]:px-4', {
          'pb-body-pad-end': isMobile && !isLandscape,
          'pb-4': isMobileLandscape
        })}
      >
        <Outlet />
      </main>
      <NavigationMobile />
      <Toaster />
    </div>
  );
};

const DesktopOverlay = () => {
  const location = useLocation();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className={'mx-auto h-[100svh] max-w-7xl'}>
      <div className={'grid h-full grid-cols-[15rem_1fr] gap-6 p-page-desktop'}>
        <SidebarDesktop />
        <div className={'grid h-[calc(100svh-3rem)] grid-rows-[2.5rem_1fr_1.25rem] gap-6'}>
          <QuotationBar />
          <Card className={'h-full overflow-hidden p-4'}>
            <ScrollArea
              viewportRef={scrollAreaRef}
              id='inner'
              type={'always'}
              className={'-mr-3 h-full pr-3'}
            >
              <main
                id='outlet-wrapper'
                className={'p-2'}
              >
                <Outlet />
              </main>
            </ScrollArea>
          </Card>
          <Footer />
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
