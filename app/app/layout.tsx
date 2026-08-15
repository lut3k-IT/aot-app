'use client';

import React from 'react';

import Init from '@/components/providers/Init';
import LayoutVariantProvider from '@/components/providers/LayoutVariantProvider';
import DevLayoutSwitcher from '@/components/ui/DevLayoutSwitcher';
import PageOverlay from '@/components/ui/PageOverlay';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutVariantProvider>
      <Init />
      <ScrollToTop />
      <PageOverlay>{children}</PageOverlay>
      <DevLayoutSwitcher />
    </LayoutVariantProvider>
  );
}
