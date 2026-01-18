'use client';

import { useParams } from 'next/navigation';

import TitanDetails from '@/features/Details/TitanDetails';

export default function TitanDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <TitanDetails routeSlug={slug} />;
}
