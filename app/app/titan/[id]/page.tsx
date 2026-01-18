'use client';

import { useParams } from 'next/navigation';

import TitanDetails from '@/features/Details/TitanDetails';

export default function TitanDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return <TitanDetails routeId={id} />;
}
