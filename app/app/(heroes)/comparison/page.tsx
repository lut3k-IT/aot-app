import { Metadata } from 'next';

import Comparison from '@/features/Comparison';

export const metadata: Metadata = {
  title: 'Comparison | AOT APP',
  description: 'Compare Attack on Titan characters side by side. Analyze their stats, MBTI types, and other attributes.'
};

export default function ComparisonPage() {
  return <Comparison />;
}
