'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative h-24 w-24'>
          <img
            src='/assets/icons/aot-icon.svg'
            alt='AOT App Logo'
            className='h-full w-full object-contain'
          />
        </div>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    </div>
  );
};

export default SplashScreen;
