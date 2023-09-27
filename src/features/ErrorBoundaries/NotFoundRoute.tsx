import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import style from '../ErrorBoundaries.module.scss';

// TODO:

const NotFoundRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h1>{t('errorBoundaries:oops')}</h1>
      <span>404</span>
      <p>{t('errorBoundaries:routeNotFound')}</p>
      <Button to={'/'}>{t('')}</Button>
    </div>
  );
};

export default NotFoundRoute;
