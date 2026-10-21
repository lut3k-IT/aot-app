import { promises as fs } from 'fs';
import path from 'path';

import { Metadata } from 'next';

import { TitanType } from '@/constants/types';
import TitanDetails from '@/features/Details/TitanDetails';

type Props = {
  params: Promise<{ slug: string }>;
};

// Titan data is static (public/data/titans.json), so every detail page is prerendered at build time
// instead of running a serverless function on each visit. Unknown slugs return a real 404.
// Next.js requires this exact export name, so the boolean-prefix rule does not apply.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const dynamicParams = false;

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/titans.json');
  const titans: TitanType[] = JSON.parse(await fs.readFile(filePath, 'utf8'));
  return titans.map((titan) => ({ slug: titan.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/titans.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const titans: TitanType[] = JSON.parse(fileContents);

    const { slug } = await params;
    const titan = titans.find((t) => t.slug === slug);

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

export default async function TitanDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <TitanDetails routeSlug={slug} />;
}
