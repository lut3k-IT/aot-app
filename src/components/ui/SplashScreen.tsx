'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background'
    >
      <div className='flex flex-col items-center gap-4'>
        <div className='relative h-24 w-24'>
          <Image
            src='/assets/icons/aot-icon.svg'
            alt='AOT App Logo'
            fill
            className='object-contain'
            priority
          />
        </div>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
