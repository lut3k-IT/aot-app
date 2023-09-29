import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/button';

// TODO:

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('errorBoundaries:oops')}</h1>
      <p>{t('errorBoundaries:unexpectedError')}</p>
      <pre>
        <i>{error.statusText || error.message}</i>
      </pre>
      <Button to={'/'}>{t('')}</Button>
    </div>
  );
};

export default ErrorPage;