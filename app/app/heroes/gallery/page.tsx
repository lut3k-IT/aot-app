'use client';

import { Suspense } from 'react';

import HeroesGallery from '@/features/Heroes/components/HeroesGallery';

export default function HeroesGalleryPage() {
  return (
    <Suspense>
      <HeroesGallery />
    </Suspense>
  );
}
