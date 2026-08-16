'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export const LandingFooter = () => {
  const { t } = useTranslation('landing');

  return (
    <footer className='border-t border-zinc-900 py-14'>
      <div className='mx-auto max-w-5xl px-6 md:px-10'>
        <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          <div>
            <Link
              href='/'
              className='font-vector text-2xl font-bold text-white'
            >
              AOT app
            </Link>
            <p className='mt-2 max-w-sm text-zinc-400'>{t('footer.description')}</p>
          </div>
          {/* Last exit to the app after reading the FAQ */}
          <Link href='/app/heroes'>
            <Button
              variant='outline'
              className='border-zinc-700 bg-transparent text-white hover:border-zinc-600 hover:bg-zinc-900 hover:text-white'
            >
              {t('hero.enterApp')}
            </Button>
          </Link>
        </div>

        <p className='mt-10 border-t border-zinc-900 pt-6 text-sm text-zinc-400'>
          &copy; {new Date().getFullYear()}{' '}
          <a
            href='https://kacperlutynski.pl'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-colors hover:text-white'
          >
            kacperlutynski.pl
          </a>
        </p>
      </div>
    </footer>
  );
};
