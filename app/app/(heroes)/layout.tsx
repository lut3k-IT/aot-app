import React from 'react';

import HeroesLayoutClient from '@/features/Heroes/HeroesLayoutClient';

export default function HeroesGroupLayout({ children }: { children: React.ReactNode }) {
  return <HeroesLayoutClient>{children}</HeroesLayoutClient>;
}
