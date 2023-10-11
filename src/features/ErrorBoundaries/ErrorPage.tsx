import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/Button';

// TODO:

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common:error.oops')}</h1>
      <p>{t('common:error.unexpectedError')}</p>
      <pre>
        <i>{error.statusText || error.message}</i>
      </pre>
    </div>
  );
};

export default ErrorPage;
