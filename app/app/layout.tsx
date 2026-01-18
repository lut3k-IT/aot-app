'use client';

import React from 'react';

import Init from '@/components/providers/Init';
import PageOverlay from '@/components/ui/PageOverlay';
import ReloadPrompt from '@/components/ui/ReloadPrompt';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReloadPrompt />
      <Init />
      <ScrollToTop />
      <PageOverlay>{children}</PageOverlay>
    </>
  );
}
