import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogClose } from '@radix-ui/react-dialog';

import { RoutePath, URL } from '@/constants';

import { Button } from './Button';
import { Label } from './Label';
import LanguageSwitcher from './LanguageSwitcher';
import { Switch } from './switch';

const SidebarMobile = () => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current && buttonRef.current.click();
  };

  return (
    <div className={'h-full w-full bg-background rounded-md flex flex-col justify-between items-center gap-6'}>
      <div className={'flex flex-col w-full text-start [&_*]:text-foreground'}>
        <DialogClose ref={buttonRef} />
        <Button
          variant={'link'}
          linkTo={RoutePath.ABOUT}
          onClick={handleClick}
        >
          {t('common:title.about')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.CHANGELOG}
          onClick={handleClick}
        >
          {t('common:title.changelog')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.PRIVACY_POLICY}
          onClick={handleClick}
        >
          {t('common:title.privacyPolicy')}
        </Button>
        <Button
          variant={'link'}
          linkTo={RoutePath.TERMS_OF_SERVICE}
          onClick={handleClick}
        >
          {t('common:title.termsOfService')}
        </Button>
        <Button
          variant={'link'}
          linkTo={URL.PORTFOLIO}
          onClick={handleClick}
        >
          {t('common:title.portfolio')}
        </Button>
      </div>
      <div className={'flex flex-col gap-14 items-center'}>
        <LanguageSwitcher />
        <div className='flex justify-center items-center space-x-3'>
          <Switch id='spoiler-mode' />
          <Label
            htmlFor='spoiler-mode'
            className='text-md font-medium leading-none'
          >
            {t('common:spoilerMode')}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
