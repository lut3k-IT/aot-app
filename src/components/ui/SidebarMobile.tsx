import { t } from 'i18next';

import { RoutePath, URL } from '@/constants';

import { Button } from './Button';

const SidebarMobile = () => {
  return (
    <div className={'h-full w-full bg-background rounded-md flex flex-col gap-4'}>
      <div className={'flex flex-col w-full text-start [&_*]:text-foreground'}>
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
        <Button
          variant={'link'}
          linkTo={URL.PORTFOLIO}
        >
          {t('common:title.portfolio')}
        </Button>
      </div>
      <div className={'h-full'}>
        <iframe
          className={'rounded-md'}
          src='https://open.spotify.com/embed/playlist/3Fi0nQ3SuAQFFdk6MViZwD?utm_source=generator'
          width='100%'
          height='100%'
          frameBorder='0'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        ></iframe>
      </div>
    </div>
  );
};

export default SidebarMobile;
