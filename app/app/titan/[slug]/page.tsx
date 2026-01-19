import { promises as fs } from 'fs';
import path from 'path';

import { Metadata } from 'next';

import { TitanType } from '@/constants/types';
import TitanDetails from '@/features/Details/TitanDetails';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/titans.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const titans: TitanType[] = JSON.parse(fileContents);

    const titan = titans.find((t) => t.slug === params.slug);

    if (!titan) {
      return {
        title: 'Titan Not Found | AOT APP'
      };
    }

    return {
      title: `${titan.name} | AOT APP`,
      description: `${titan.name} - Explore Attack on Titan titan details.`
    };
  } catch (error) {
    console.error('Error generating metadata for titan:', error);
    return {
      title: 'AOT APP'
    };
  }
}

export default function TitanDetailsPage({ params }: Props) {
  return <TitanDetails routeSlug={params.slug} />;
}
