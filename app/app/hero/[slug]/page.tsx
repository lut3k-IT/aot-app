'use client';

import { useParams } from 'next/navigation';

import HeroDetails from '@/features/Details/HeroDetails';

export default function HeroDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <HeroDetails routeSlug={slug} />;
}
