import { Metadata } from 'next';

import QuotationDetails from '@/features/QuotationDetails';
import quotations from '@/i18n/locales/en/quotations.json';

type Props = {
  params: Promise<{ id: string }>;
};

// Quotations are static (i18n/locales/en/quotations.json), so every detail page is prerendered at build time
// instead of running a serverless function on each visit. Unknown ids return a real 404.
// Next.js requires this exact export name, so the boolean-prefix rule does not apply.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(quotations).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const text = (quotations as Record<string, string>)[id];

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

export default async function QuotationDetailsPage({ params }: Props) {
  const { id } = await params;
  return <QuotationDetails routeId={id} />;
}
