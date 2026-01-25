import { Metadata } from 'next';

import heroes from '@/data/heroes';
import HeroDetails from '@/features/Details/HeroDetails';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hero = heroes.find((h) => h.slug === slug);

  if (!hero) {
    return {
      title: 'Hero Not Found | AOT APP'
    };
  }

  const fullName = `${hero.firstName} ${hero.lastName || ''}`.trim();

  return {
    title: `${fullName} | AOT APP`,
    description: `${fullName} - Explore Attack on Titan character details.`
  };
}

export default async function HeroDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <HeroDetails routeSlug={slug} />;
}
