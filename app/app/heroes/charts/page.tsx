import { Metadata } from 'next';

import HeroesCharts from '@/features/Heroes/components/HeroesCharts';

export const metadata: Metadata = {
  title: 'Heroes Charts | AOT APP'
};

export default function HeroesChartsPage() {
  return <HeroesCharts />;
}
