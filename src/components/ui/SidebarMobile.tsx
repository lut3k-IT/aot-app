import { RoutePath, URL } from '@/constants';

import { Button } from './Button';
import { Checkbox } from './checkbox';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const SidebarMobile = () => {
  const { t } = useTranslation();

  return (
    <div className={'h-full w-full bg-background rounded-md flex flex-col justify-between items-center gap-6'}>
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
      <div className={'flex flex-col gap-14 items-center'}>
        <LanguageSwitcher />
        <div className='flex justify-center items-center space-x-2'>
          <Checkbox
            id='spoiler-mode'
            className={'w-5 h-5 rounded-sm'}
          />
          <label
            htmlFor='spoiler-mode'
            className='text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {t('common:spoilerMode')}
          </label>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
