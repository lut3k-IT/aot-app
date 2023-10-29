import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import useAppSelector from '@/components/hooks/useAppSelector';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadHeroes } from '@/store/heroesSlice';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titanSlice';

// perform code once the app is loaded
const Init = () => {
  const dispatch = useAppDispatch();
  const heroes = useAppSelector((state) => state.heroes.data);

  useEffect(() => {
    dispatch(loadQuotations());
    dispatch(loadHeroes());
    dispatch(loadTitans());
  }, []);

  useEffect(() => {
    heroes.forEach((hero) => {
      const img = new Image();
      img.src = `/assets/img/heroes/${hero.id}.jpg`;
    });
  }, [heroes]);

  console.log('render init');

  useEffect(() => {
    return () => {
      console.log('unmount init');
    };
  }, []);

  return (
    <>
      <AppHelmet />
    </>
  );
};

export default Init;
