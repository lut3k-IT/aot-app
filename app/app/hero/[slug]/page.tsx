import { Metadata } from 'next';

import heroes from '@/data/heroes';
import HeroDetails from '@/features/Details/HeroDetails';

type Props = {
  params: Promise<{ slug: string }>;
};

// Hero data is static (lives in the repo), so every detail page is prerendered at build time
// instead of running a serverless function on each visit. Unknown slugs return a real 404.
// Next.js requires this exact export name, so the boolean-prefix rule does not apply.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const dynamicParams = false;

export function generateStaticParams() {
  return heroes.map((hero) => ({ slug: hero.slug }));
}

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
