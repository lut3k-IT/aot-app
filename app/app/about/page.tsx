import { Metadata } from 'next';

import About from '@/features/Aside/About';

export const metadata: Metadata = {
  title: 'About | AOT APP'
};

export default function AboutPage() {
  return <About />;
}
