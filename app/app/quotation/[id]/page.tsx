'use client';

import { useParams } from 'next/navigation';

import QuotationDetails from '@/features/QuotationDetails';

export default function QuotationDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return <QuotationDetails routeId={id} />;
}
