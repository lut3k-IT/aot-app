import { Metadata } from 'next';

import HeroesComparison from '@/features/Heroes/components/HeroesComparison';

export const metadata: Metadata = {
  title: 'Heroes Comparison | AOT APP'
};

export default function HeroesComparisonPage() {
  return <HeroesComparison />;
}
