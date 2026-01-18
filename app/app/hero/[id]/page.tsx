'use client';

import { useParams } from 'next/navigation';

import HeroDetails from '@/features/Details/HeroDetails';

export default function HeroDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return <HeroDetails routeId={id} />;
}
