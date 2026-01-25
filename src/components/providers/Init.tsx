'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import DynamicTitle from '@/components/ui/DynamicTitle';
import SplashScreen from '@/components/ui/SplashScreen';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titansSlice';

let didInit = false;

const Init = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [shouldShowSplash, setShouldShowSplash] = useState(true);

  // Loading states
  const quotationsStatus = useAppSelector((state) => state.quotations.status);
  const titansStatus = useAppSelector((state) => state.titans.status);

  // Check if initial data is loaded
  const isQuotationsLoaded = quotationsStatus === 'succeeded' || quotationsStatus === 'failed';
  const isTitansLoaded = titansStatus === 'succeeded' || titansStatus === 'failed';
  const isDataLoaded = isQuotationsLoaded && isTitansLoaded;

  useEffect(() => {
    if (didInit) return;
    didInit = true;
    dispatch(loadQuotations());
    dispatch(loadTitans());
  }, []);

  useEffect(() => {
    // Determine minimum display time for splash screen
    const timer = setTimeout(() => {
      // Only hide if data is loaded (or if we are not on a page dependent on that data immediately, but simpler to wait)
      // Actually, let's wait for data only if we are initializing
      if (isDataLoaded) {
        setShouldShowSplash(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isDataLoaded]);

  // Force hide splash after 5 seconds max (fallback)
  useEffect(() => {
    const timer = setTimeout(() => setShouldShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return <AnimatePresence>{shouldShowSplash && <SplashScreen key='splash-screen' />}</AnimatePresence>;
};

export default Init;
