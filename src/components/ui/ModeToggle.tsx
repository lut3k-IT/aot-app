import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { useTheme } from '@/components/ui/ThemeProvider';
import { DeviceType } from '@/constants/types';

import Icon from './Icon';

interface ModeToggleProps {
  variant?: DeviceType;
}

// @todo - system theme application issue

const ModeToggle = (props: ModeToggleProps) => {
  const { variant = 'mobile' } = props;
  const { t } = useTranslation();

  const { theme, setTheme } = useTheme();
  // @audit make a types for this || make a helper function to get the theme name || Enum
  const [themeName, setThemeName] = useState(t(`common:ui.modeToggle.${theme}`));

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
      <span className='sr-only'>{t('common:ui.modeToggle.title')}</span>
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
        <span className='sr-only'>{t('common:ui.modeToggle.title')}</span>
        <span className={'px-1 font-medium'}>{themeName}</span>
      </Button>
    </span>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{variant === 'mobile' ? MobileButton : DesktopButton}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme('light');
            setThemeName(t('common:ui.modeToggle.light'));
          }}
        >
          {t('common:ui.modeToggle.light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
            setThemeName(t('common:ui.modeToggle.dark'));
          }}
        >
          {t('common:ui.modeToggle.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
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
