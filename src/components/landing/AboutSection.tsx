'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export const AboutSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section
      id='about'
      className='scroll-mt-12 border-t border-zinc-900 py-24 md:py-32'
    >
      <div className='mx-auto grid max-w-5xl gap-8 px-6 md:px-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16'>
        <h2 className='text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl'>{t('about.title')}</h2>
        <div className='flex flex-col items-start gap-6'>
          <p className='text-lg leading-relaxed text-zinc-300'>{t('about.description1')}</p>
          <p className='text-lg leading-relaxed text-zinc-400'>{t('about.description2')}</p>
          <Link href='/app/about'>
            <Button
              variant='outline'
              className='border-zinc-700 bg-transparent text-white hover:border-zinc-600 hover:bg-zinc-900 hover:text-white'
            >
              {t('about.moreAboutProject')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
