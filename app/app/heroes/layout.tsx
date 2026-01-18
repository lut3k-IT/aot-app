import HeroesLayoutClient from '@/features/Heroes/HeroesLayoutClient';

export default function HeroesLayout({ children }: { children: React.ReactNode }) {
  return <HeroesLayoutClient>{children}</HeroesLayoutClient>;
}
