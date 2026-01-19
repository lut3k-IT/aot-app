'use client';

import { useEffect, useRef } from 'react';
import React from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

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

interface PageOverlayProps {
  children: React.ReactNode;
}

const MobileOverlay = ({ children }: PageOverlayProps) => {
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
        {children}
      </main>
      <NavigationMobile />
      <Toaster />
    </div>
  );
};

const DesktopOverlay = ({ children }: PageOverlayProps) => {
  const pathname = usePathname();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

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
                {children}
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

const PageOverlay = ({ children }: PageOverlayProps) => {
  const isMobileLandscape = useIsMobileOrLandscape();
  return isMobileLandscape ? <MobileOverlay>{children}</MobileOverlay> : <DesktopOverlay>{children}</DesktopOverlay>;
};

export default PageOverlay;
