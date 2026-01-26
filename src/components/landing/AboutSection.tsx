'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export const AboutSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className='relative w-full overflow-hidden bg-zinc-950 py-24'>
      <div className='absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent' />

      <div className='container relative z-10 mx-auto px-4 md:px-6'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-8'>
          <div className='flex flex-col justify-center space-y-6'>
            <h2 className='bg-gradient-to-r from-white to-zinc-400 bg-clip-text pb-2 text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl'>
              {t('about.title')}
            </h2>
            <p className='max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              {t('about.description1')}
            </p>
            <p className='max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              {t('about.description2')}
            </p>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link href='/app/about'>
                <Button
                  variant='outline'
                  className='border-zinc-700 bg-transparent text-white hover:bg-zinc-800'
                >
                  {t('about.moreAboutProject')}
                </Button>
              </Link>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='relative h-[400px] w-full max-w-[500px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2'>
              <div className='absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10' />
              <div className='flex h-full w-full items-center justify-center'>
                <span className='text-9xl opacity-20'>⚔️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
