import { useEffect } from 'react';

import useAppDispatch from '@/components/hooks/useAppDispatch';
import AppHelmet from '@/components/ui/AppHelmet';
import { loadHeroes } from '@/store/heroesSlice';
import { loadQuotations } from '@/store/quotationsSlice';
import { loadTitans } from '@/store/titansSlice';

import LaunchDialog from './LaunchDialog';

const Init = () => {
  const dispatch = useAppDispatch();
  // const heroes = useAppSelector((state) => state.heroes.data);

  useEffect(() => {
    dispatch(loadQuotations());
    dispatch(loadHeroes());
    dispatch(loadTitans());
  }, []);

  // useEffect(() => {
  //   heroes.forEach((hero) => {
  //     const img = new Image();
  //     img.src = `/assets/img/heroes/${hero.id}.jpg`;
  //   });
  // }, [heroes]);

  return (
    <>
      <AppHelmet />
      {/* <LaunchDialog /> */}
    </>
  );
};

export default Init;
