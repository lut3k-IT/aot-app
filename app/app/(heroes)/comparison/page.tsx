import { Metadata } from 'next';

import HeroesComparison from '@/features/Heroes/components/HeroesComparison';

export const metadata: Metadata = {
  title: 'Comparison | AOT APP',
  description: 'Compare Attack on Titan characters side by side. Analyze their stats, MBTI types, and other attributes.'
};

export default function ComparisonPage() {
  return <HeroesComparison />;
}
