'use client';

import { useTranslation } from 'react-i18next';
import { Heart, Quote, Trophy, Users } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'features.items.database.title',
    description: 'features.items.database.description'
  },
  {
    icon: Quote,
    title: 'features.items.quotations.title',
    description: 'features.items.quotations.description'
  },
  {
    icon: Trophy,
    title: 'features.items.quiz.title',
    description: 'features.items.quiz.description'
  },
  {
    icon: Heart,
    title: 'features.items.favorites.title',
    description: 'features.items.favorites.description'
  }
];

export const FeaturesSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className='container mx-auto px-4 py-24 md:px-6'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl'>
          {t('features.title')}
        </h2>
        <p className='mx-auto max-w-[700px] text-zinc-400 md:text-xl'>{t('features.description')}</p>
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-900/20'
          >
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white'>
              <feature.icon className='h-6 w-6' />
            </div>
            <h3 className='mb-2 text-xl font-bold text-white'>{t(feature.title)}</h3>
            <p className='text-zinc-400'>{t(feature.description)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
