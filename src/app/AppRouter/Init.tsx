import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadHeroes } from '@/store/heroesSlice';

// perform code once the app is loaded
const Init = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadHeroes());
  }, []);

  return (
    <>
      <AppHelmet />
    </>
  );
};

export default Init;
