import { Metadata } from 'next';

import QuotationDetails from '@/features/QuotationDetails';
import quotations from '@/i18n/locales/en/quotations.json';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const text = (quotations as Record<string, string>)[params.id];

  if (!text) {
    return {
      title: 'Quotation Not Found | AOT APP'
    };
  }

  const truncatedText = text.substring(0, 20) + (text.length > 20 ? '...' : '');

  return {
    title: `${truncatedText} | AOT APP`,
    description: `Quotation: ${text.substring(0, 150)}...`
  };
}

export default function QuotationDetailsPage({ params }: Props) {
  return <QuotationDetails routeId={params.id} />;
}
