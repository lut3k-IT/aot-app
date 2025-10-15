import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titansSlice';

let didInit = false;

const Init = () => {
  const dispatch = useAppDispatch();
  // const heroes = useAppSelector((state) => state.heroes.data);

  // useEffect(() => {
  //   heroes.forEach((hero) => {
  //     const img = new Image();
  //     img.src = `/assets/img/heroes/${hero.id}.jpg`;
  //   });
  // }, [heroes]);

  useEffect(() => {
    if (didInit) return;
    didInit = true;
    dispatch(loadQuotations());
    dispatch(loadTitans());
  }, []);

  return <AppHelmet />;
};

export default Init;
