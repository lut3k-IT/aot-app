import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadHeroes } from '@/store/heroesSlice';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titanSlice';

// perform code once the app is loaded
const Init = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuotations());
    dispatch(loadHeroes());
    dispatch(loadTitans());
  }, []);

  return (
    <>
      <AppHelmet />
    </>
  );
};

export default Init;
