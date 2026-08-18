'use client';

import { Trans, useTranslation } from 'react-i18next';
import Link from 'next/link';

import { AboutSection } from '@/components/landing/AboutSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/Button';

const LandingPage = () => {
  const { t } = useTranslation('landing');

  return (
    <main className='min-h-svh bg-zinc-950 text-zinc-100'>
      <section className='mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 py-24 md:px-10'>
        <h1 className='font-vector text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-8xl'>
          {t('hero.title')}
        </h1>

        {/* Brand accent rule - the only non-text element in the hero */}
        <div
          aria-hidden
          className='mt-8 h-px w-16 bg-red-600'
        />

        <p className='mt-8 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl'>
          <Trans
            i18nKey='hero.description'
            t={t}
            components={{
              1: (
                <span
                  key='1'
                  className='font-semibold text-white'
                />
              )
            }}
          />
        </p>

        <div className='mt-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4'>
          <Link href='/app/heroes'>
            <Button
              size='lg'
              className='bg-red-600 text-base text-white hover:bg-red-700'
            >
              {t('hero.enterApp')}
            </Button>
          </Link>
          {/* Anchor down the page replaces the scroll indicator */}
          <a
            href='#about'
            className='inline-flex h-11 items-center rounded-md px-4 text-base text-zinc-300 transition-colors hover:text-white'
          >
            {t('hero.learnMore')}
          </a>
        </div>
      </section>

      <AboutSection />
      <FeaturesSection />
      <FaqSection />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
