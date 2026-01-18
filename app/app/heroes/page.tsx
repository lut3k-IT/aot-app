import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heroes Gallery | AOT APP'
};

import HeroesGallery from '@/features/Heroes/components/HeroesGallery';

export default function HeroesPage() {
  return (
    <Suspense>
      <HeroesGallery />
    </Suspense>
  );
}
