import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { RoutePath } from '@/constants/enums';

const NotFoundRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <div className={'flex-center flex-col gap-4 pt-body-pad-start'}>
      <h1 className={'text-2xl font-normal'}>{t('common:error.oops')}</h1>
      <span className={'text-7xl font-bold text-muted2'}>404</span>
      <p>{t('common:error.routeNotFound')}</p>
      <Button
        linkTo={RoutePath.HEROES_GALLERY}
        iconName={'chevronLeft'}
        aria-label={t('common:error.backToHomepage')}
      >
        {t('common:error.backToHomepage')}
      </Button>
    </div>
  );
};

export default NotFoundRoute;
