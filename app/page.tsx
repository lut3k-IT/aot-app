'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

import { AboutSection } from '@/components/landing/AboutSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/Button';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className='relative min-h-screen bg-zinc-950 text-zinc-100'>
      {/* Animated background grid - Fixed to stay in background while scrolling */}
      <div className='fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]' />

      {/* Gradient orbs - Fixed */}
      <div className='fixed left-1/4 top-1/4 -z-10 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-3xl' />
      <div className='fixed bottom-1/4 right-1/4 -z-10 h-96 w-96 animate-pulse rounded-full bg-orange-600/10 blur-3xl' />

      {/* Hero Section */}
      <section className='relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center'>
        <div
          className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h1 className='mb-2 font-vector text-7xl font-bold tracking-tight text-white md:text-9xl'>
            <span className='bg-gradient-to-r from-red-500 via-orange-400 to-red-600 bg-clip-text px-1 text-transparent'>
              AOT app
            </span>
          </h1>
        </div>

        <p
          className={`mt-8 max-w-xl text-lg text-zinc-400 transition-all delay-300 duration-1000 md:text-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          Odkryj świat <span className='font-semibold text-white'>Attack on Titan</span> jak nigdy wcześniej. Przeglądaj
          postacie, cytaty i sprawdź się w quizie.
        </p>

        <div
          className={`mt-12 flex flex-col gap-4 transition-all delay-500 duration-1000 sm:flex-row ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Link href='/app/heroes'>
            <Button
              size='lg'
              className='group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-lg font-semibold text-white transition-all hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-900/30'
            >
              <span className='relative z-10'>Wejdź do aplikacji</span>
              <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full' />
            </Button>
          </Link>
          <Link href='/app/about'>
            <Button
              variant='outline'
              size='lg'
              className='border-zinc-600 bg-zinc-900/50 px-8 py-6 text-lg text-white backdrop-blur-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white'
            >
              Dowiedz się więcej
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 animate-bounce text-zinc-500 transition-all delay-1000 duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <ArrowDown className='h-6 w-6' />
        </div>
      </section>

      {/* New Sections */}
      <div className='relative z-10 bg-zinc-950/80 backdrop-blur-sm'>
        <AboutSection />
        <FeaturesSection />
        <FaqSection />
      </div>

      <LandingFooter />
    </main>
  );
};

export default LandingPage;
