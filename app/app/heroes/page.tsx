'use client';

import { Suspense } from 'react';

import HeroesGallery from '@/features/Heroes/components/HeroesGallery';

export default function HeroesPage() {
  return (
    <Suspense>
      <HeroesGallery />
    </Suspense>
  );
}
