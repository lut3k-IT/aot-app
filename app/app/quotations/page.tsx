import { Metadata } from 'next';

import Quotations from '@/features/Quotations';

export const metadata: Metadata = {
  title: 'Quotations | AOT APP'
};

export default function QuotationsPage() {
  return <Quotations />;
}
