'use client';

import { useTranslation } from 'react-i18next';

const features = [
  {
    title: 'features.items.database.title',
    description: 'features.items.database.description'
  },
  {
    title: 'features.items.quotations.title',
    description: 'features.items.quotations.description'
  },
  {
    title: 'features.items.quiz.title',
    description: 'features.items.quiz.description'
  },
  {
    title: 'features.items.favorites.title',
    description: 'features.items.favorites.description'
  }
];

export const FeaturesSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className='border-t border-zinc-900 py-24 md:py-32'>
      <div className='mx-auto max-w-5xl px-6 md:px-10'>
        <h2 className='max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl'>
          {t('features.title')}
        </h2>
        <p className='mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400'>{t('features.description')}</p>

        <ul className='mt-14 border-t border-zinc-900'>
          {features.map((feature) => (
            <li
              key={feature.title}
              className='grid gap-2 border-b border-zinc-900 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12'
            >
              <h3 className='text-lg font-semibold text-white'>{t(feature.title)}</h3>
              <p className='leading-relaxed text-zinc-400'>{t(feature.description)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
