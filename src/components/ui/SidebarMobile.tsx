import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogClose } from '@radix-ui/react-dialog';
import classNames from 'classnames';

import { ExternalUrl, RoutePath } from '@/constants/enums';

import useIsLandscape from '../hooks/useIsLandscape';
import AppVersionBadge from './AppVersionBadge';
import { Button } from './Button';
import BuyMeACoffee from './BuyMeACoffee';
import LanguageSwitcher from './LanguageSwitcher';
import SwitchSpoilerMode from './SwitchSpoilerMode';

const SidebarMobile = () => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLandscape = useIsLandscape();

  const handleClick = () => {
    buttonRef.current && buttonRef.current.click();
  };

  return (
    <div className={'flex h-full w-full flex-col items-center justify-between gap-6 rounded-md bg-background'}>
      <div className={'flex w-full flex-col text-start [&_*]:text-foreground'}>
        <DialogClose ref={buttonRef} />
        <Button
          variant={'link'}
          linkTo={RoutePath.ABOUT}
          onClick={handleClick}
          aria-label={t('common:title.about')}
        >
          {t('common:title.about')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.CHANGELOG}
          onClick={handleClick}
          aria-label={t('common:title.changelog')}
        >
          {t('common:title.changelog')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.TERMS_OF_SERVICE}
          onClick={handleClick}
          aria-label={t('common:title.termsAndConditions')}
        >
          {t('common:title.termsAndConditions')}
        </Button>
        <Button
          variant={'link'}
          linkTo={ExternalUrl.PORTFOLIO}
          onClick={handleClick}
          aria-label={t('common:title.portfolio')}
        >
          {t('common:title.portfolio')}
        </Button>
      </div>
      <div
        className={classNames('flex flex-col items-center gap-14 pb-14', {
          '!flex-row flex-wrap justify-center gap-6 !pb-4': isLandscape
        })}
      >
        <LanguageSwitcher />
        <SwitchSpoilerMode />
        {!isLandscape && <BuyMeACoffee className={'mx-auto'} />}
      </div>
      <AppVersionBadge className={'absolute bottom-3'} />
    </div>
  );
};

export default SidebarMobile;
