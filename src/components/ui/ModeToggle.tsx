import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { useTheme } from '@/components/ui/ThemeProvider';
import { Device, Theme } from '@/constants/enums';

import Icon from './Icon';

interface ModeToggleProps {
  variant?: Device;
}

const ModeToggle = (props: ModeToggleProps) => {
  const { variant = Device.MOBILE } = props;
  const { t } = useTranslation();

  const { theme, setTheme } = useTheme();
  const [themeName, setThemeName] = useState(t(`common:ui.modeToggle.${theme}`));

  useEffect(() => {
    setThemeName(t(`common:ui.modeToggle.${theme}`));
  }, [theme, t]);

  const MobileButton = (
    <Button
      variant='ghost'
      size='icon'
      aria-label={t('common:ui.modeToggle.title')}
    >
      <Icon
        name={'sun'}
        className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
      />
      <Icon
        name={'moon'}
        className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
      />
      <span
        suppressHydrationWarning
        className='sr-only'
      >
        {t('common:ui.modeToggle.title')}
      </span>
    </Button>
  );

  const DesktopButton = (
    <span className={'flex w-28 justify-center hover:cursor-pointer'}>
      <Button
        variant='ghost'
        id={'modeToggle'}
        className={'w-full'}
        aria-label={t('common:ui.modeToggle.title')}
      >
        <div className={'relative'}>
          <Icon
            name={'sun'}
            className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          />
          <Icon
            name={'moon'}
            className='absolute top-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          />
        </div>
        <span
          suppressHydrationWarning
          className='sr-only'
        >
          {t('common:ui.modeToggle.title')}
        </span>
        <span
          suppressHydrationWarning
          className={'px-1 font-medium'}
        >
          {themeName}
        </span>
      </Button>
    </span>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{variant === Device.MOBILE ? MobileButton : DesktopButton}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme(Theme.LIGHT);
            setThemeName(t('common:ui.modeToggle.light'));
          }}
        >
          {t('common:ui.modeToggle.light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme(Theme.DARK);
            setThemeName(t('common:ui.modeToggle.dark'));
          }}
        >
          {t('common:ui.modeToggle.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme(Theme.SYSTEM);
            setThemeName(t('common:ui.modeToggle.system'));
          }}
        >
          {t('common:ui.modeToggle.system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
