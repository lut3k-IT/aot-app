'use client';

import React from 'react';
import classNames from 'classnames';

import { ElementsIds } from '@/constants/enums';

import useIsLandscape from '../../hooks/useIsLandscape';
import useIsMobile from '../../hooks/useIsMobile';
import useIsMobileOrLandscape from '../../hooks/useIsMobileOrLandscape';
import NavigationMobile from '../NavigationMobile';
import QuotationBar from '../QuotationBar';
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
        className={classNames('*:px-4', {
          'pb-body-pad-end': isMobile && !isLandscape,
          'pb-4': isMobileLandscape
        })}
      >
        {children}
        <div id={ElementsIds.PAGE_PAGINATION} className='empty:hidden' />
      </main>
      <NavigationMobile />
      <Toaster />
    </div>
  );
};

/**
 * Treść przewija się razem z całą stroną, tak jak na zwykłej witrynie. Wcześniejszy układ
 * zamykał ją w karcie przyklejonej do wysokości okna z własnym paskiem przewijania, przez
 * co na same postacie zostawało niecałe pół ekranu.
 *
 * Nawigacja przykleja się do góry i zajmuje pełną wysokość okna, więc mimo długiego
 * przewijania zawsze jest pod ręką. Szerokość idzie do 1600 px, co przy tej samej karcie
 * postaci daje cztery kolumny zamiast dwóch.
 */
const DesktopOverlay = ({ children }: PageOverlayProps) => {
  return (
    <div className={'mx-auto w-full max-w-[100rem] px-8'}>
      <div className={'grid grid-cols-[15rem_1fr] gap-10'}>
        <div className={'sticky top-0 h-svh py-page-desktop'}>
          <SidebarDesktop />
        </div>
        <div className={'flex min-h-svh min-w-0 flex-col pb-page-desktop'}>
          <div className={'pb-4 pt-page-desktop'}>
            <QuotationBar />
          </div>
          <main
            id={'outlet-wrapper'}
            className={'min-w-0 flex-1'}
          >
            {children}
          </main>
          <div
            id={ElementsIds.PAGE_PAGINATION}
            className={'empty:hidden pt-6'}
          />
          <div className={'pt-10'}>
            <Footer />
          </div>
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
