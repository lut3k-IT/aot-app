'use client';

import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titansSlice';

let didInit = false;

const Init = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (didInit) return;
    didInit = true;
    dispatch(loadQuotations());
    dispatch(loadTitans());
  }, []);

  return <AppHelmet />;
};

export default Init;
