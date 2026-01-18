'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950'>
      {/* Animated background grid */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]' />

      {/* Gradient orbs */}
      <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-3xl' />
      <div className='absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-orange-600/10 blur-3xl' />

      {/* Content */}
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center'>
        {/* Logo/Title */}
        <div
          className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h1 className='mb-2 font-vector text-7xl font-bold tracking-tight text-white md:text-9xl'>
            <span className='bg-gradient-to-r from-red-500 via-orange-400 to-red-600 bg-clip-text text-transparent'>
              AOT
            </span>
          </h1>
          <p className='text-xl font-medium uppercase tracking-[0.3em] text-zinc-400 md:text-2xl'>Application</p>
        </div>

        {/* Description */}
        <p
          className={`mt-8 max-w-xl text-lg text-zinc-400 transition-all delay-300 duration-1000 md:text-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          Odkryj świat <span className='font-semibold text-white'>Attack on Titan</span> jak nigdy wcześniej. Przeglądaj
          postacie, cytaty i sprawdź się w quizie.
        </p>

        {/* CTA Buttons */}
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
              className='border-zinc-700 px-8 py-6 text-lg text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800/50 hover:text-white'
            >
              Dowiedz się więcej
            </Button>
          </Link>
        </div>

        {/* Features preview */}
        <div
          className={`mt-20 grid max-w-4xl grid-cols-1 gap-6 px-4 transition-all delay-700 duration-1000 sm:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <FeatureCard
            icon='👥'
            title='Postacie'
            description='Szczegółowe profile wszystkich bohaterów i ich statystyki'
          />
          <FeatureCard
            icon='💬'
            title='Cytaty'
            description='Najbardziej pamiętne cytaty z całej serii'
          />
          <FeatureCard
            icon='🧠'
            title='Quiz'
            description='Sprawdź swoją wiedzę o świecie Attack on Titan'
          />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent' />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className='group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-800/50'>
    <div className='mb-3 text-3xl'>{icon}</div>
    <h3 className='mb-2 text-lg font-semibold text-white'>{title}</h3>
    <p className='text-sm text-zinc-400'>{description}</p>
  </div>
);

export default LandingPage;
