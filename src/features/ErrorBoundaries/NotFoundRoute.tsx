import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/Button';

// TODO:

const NotFoundRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common:error.oops')}</h1>
      <span>404</span>
      <p>{t('common:error.routeNotFound')}</p>
      <Button to={'/'}>{t('')}</Button>
    </div>
  );
};

export default NotFoundRoute;
