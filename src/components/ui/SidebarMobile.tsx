import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogClose } from '@radix-ui/react-dialog';

import { ExternalUrl, RoutePath } from '@/constants/enums';

import AppVersionBadge from './AppVersionBadge';
import { Button } from './Button';
import BuyMeACoffee from './BuyMeACoffee';
import LanguageSwitcher from './LanguageSwitcher';
import SwitchSpoilerMode from './SwitchSpoilerMode';

const SidebarMobile = () => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        >
          {t('common:title.about')}
        </Button>
        {/* <Button
          variant={'link'}
          linkTo={RoutePath.CHANGELOG}
          onClick={handleClick}
        >
          {t('common:title.changelog')}
        </Button> */}
        {/* <Button
          variant={'link'}
          linkTo={RoutePath.PRIVACY_POLICY}
          onClick={handleClick}
        >
          {t('common:title.privacyPolicy')}
        </Button> */}
        <Button
          variant={'link'}
          linkTo={RoutePath.TERMS_OF_SERVICE}
          onClick={handleClick}
        >
          {t('common:title.termsAndConditions')}
        </Button>
        <Button
          variant={'link'}
          linkTo={ExternalUrl.PORTFOLIO}
          onClick={handleClick}
        >
          {t('common:title.portfolio')}
        </Button>
      </div>
      <div className={'flex flex-col items-center gap-14'}>
        <LanguageSwitcher />
        <SwitchSpoilerMode />
        <BuyMeACoffee className={'mx-auto'} />
        {/* @todo find better solution to add space */}
        <div className={'h-1'}></div>
      </div>
      <AppVersionBadge className={'absolute bottom-3'} />
    </div>
  );
};

export default SidebarMobile;
