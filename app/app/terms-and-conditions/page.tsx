import { Metadata } from 'next';

import TermsAndConditions from '@/features/Aside/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms And Conditions | AOT APP'
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
