import { useTranslation } from 'react-i18next';

import { RoutePath } from '@/constants/enums';

import ButtonGoBack from '../ButtonGoBack';

interface ErrorComponentProps {
  statusText: string;
  message: string;
}

const ErrorComponent = ({ statusText, message }: ErrorComponentProps) => {
  const { t } = useTranslation();

  return (
    <div className={'flex-center flex-col gap-4 pt-body-pad-start'}>
      <h1 className={'text-2xl font-normal'}>{t('common:error.oops')}</h1>
      <span className={'text-4xl font-bold text-muted2-foreground'}>{statusText}</span>
      <pre>
        <i>{message}</i>
      </pre>
      <ButtonGoBack
        fallbackRoute={RoutePath.HEROES_GALLERY}
        aria-label={t('common:navigation.goBack')}
      />
    </div>
  );
};

export default ErrorComponent;
