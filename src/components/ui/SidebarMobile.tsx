import { t } from 'i18next';

import { RoutePath, URL } from '@/constants';

import { Button } from './Button';

const SidebarMobile = () => {
  return (
    <div className={'h-full w-full bg-background rounded-md flex flex-col gap-4'}>
      <div className={'flex flex-col w-full text-start'}>
        <Button
          variant={'link'}
          linkTo={RoutePath.ABOUT}
        >
          {t('common:title.about')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.PRIVACY_POLICY}
        >
          {t('common:title.privacyPolicy')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.TERMS_OF_SERVICE}
        >
          {t('common:title.termsOfService')}
        </Button>
        <Button variant={'link'}>
          <a href={URL.PORTFOLIO}>{t('common:title.portfolio')}</a>
        </Button>
      </div>
    </div>
  );
};

export default SidebarMobile;
