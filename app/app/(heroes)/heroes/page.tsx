import { Suspense } from 'react';
import { Metadata } from 'next';

import HeroesGallery from '@/features/Heroes/components/HeroesGallery';

export const metadata: Metadata = {
  title: 'Heroes | AOT APP',
  description:
    'Browse all Attack on Titan characters. Filter by status, MBTI, species, and more. Explore the complete heroes gallery with detailed character profiles.'
};

export default function HeroesPage() {
  return (
    <Suspense>
      <HeroesGallery />
    </Suspense>
  );
}
