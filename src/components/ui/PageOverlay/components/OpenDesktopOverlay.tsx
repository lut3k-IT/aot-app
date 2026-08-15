'use client';

import React from 'react';

import { ElementsIds } from '@/constants/enums';

import QuotationBar from '../../QuotationBar';
import SidebarDesktop from '../../SidebarDesktop';
import { Toaster } from '../../Toaster';
import Footer from './Footer';

interface OpenDesktopOverlayProps {
  children: React.ReactNode;
}

/**
 * Otwarta powłoka desktopowa: treść przewija się razem z całą stroną, tak jak na
 * zwykłej witrynie. Znika przez to karta na pełną wysokość okna i zagnieżdżony pasek
 * przewijania, które w poprzednim układzie zostawiały na treść niecałe pół ekranu.
 *
 * Nawigacja przykleja się do góry i zajmuje pełną wysokość okna, więc mimo długiego
 * przewijania zawsze jest pod ręką. Szerokość idzie do 1600 px, co przy tej samej
 * karcie postaci daje cztery kolumny zamiast dwóch.
 */
const OpenDesktopOverlay = ({ children }: OpenDesktopOverlayProps) => {
  return (
    <div className={'mx-auto w-full max-w-[100rem] px-8'}>
      <div className={'grid grid-cols-[15rem_1fr] gap-10'}>
        <div className={'sticky top-0 h-[100svh] py-page-desktop'}>
          <SidebarDesktop />
        </div>
        <div className={'flex min-h-[100svh] min-w-0 flex-col pb-page-desktop'}>
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

export default OpenDesktopOverlay;
