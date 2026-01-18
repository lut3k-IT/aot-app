import { Metadata } from 'next';

import Titans from '@/features/TitansGallery';

export const metadata: Metadata = {
  title: 'Titans Gallery | AOT APP'
};

export default function TitansPage() {
  return <Titans />;
}
