import { MetadataRoute } from 'next';

import heroesData from '../public/data/heroes.json';
import titansData from '../public/data/titans.json';

const BASE_URL = 'https://aot.kacperlutynski.pl';

// Quotation IDs (1-92 based on the quotations.json file)
const QUOTATION_IDS = Array.from({ length: 92 }, (_, i) => i + 1);

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${BASE_URL}/app/heroes`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${BASE_URL}/app/charts`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/app/comparison`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${BASE_URL}/app/titans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/app/quotations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/app/quiz`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${BASE_URL}/app/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${BASE_URL}/app/changelog`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3
    },
    {
      url: `${BASE_URL}/app/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.2
    }
  ];

  // Dynamic hero pages
  const heroPages: MetadataRoute.Sitemap = heroesData.map((hero) => ({
    url: `${BASE_URL}/app/hero/${hero.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  // Dynamic titan pages
  const titanPages: MetadataRoute.Sitemap = titansData.map((titan) => ({
    url: `${BASE_URL}/app/titan/${titan.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  // Dynamic quotation pages
  const quotationPages: MetadataRoute.Sitemap = QUOTATION_IDS.map((id) => ({
    url: `${BASE_URL}/app/quotation/${id}`,
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.4
  }));

  return [...staticPages, ...heroPages, ...titanPages, ...quotationPages];
}
