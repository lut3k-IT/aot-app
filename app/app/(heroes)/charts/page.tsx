import { Metadata } from 'next';

import HeroesCharts from '@/features/Heroes/components/HeroesCharts';

export const metadata: Metadata = {
  title: 'Charts | AOT APP',
  description:
    'Explore Attack on Titan character statistics through interactive charts. Analyze MBTI distribution, height, weight, and age of your favorite characters.'
};

export default function ChartsPage() {
  return <HeroesCharts />;
}
