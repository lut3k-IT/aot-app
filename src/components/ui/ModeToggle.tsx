import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { useTheme } from '@/components/ui/ThemeProvider';
import { DeviceType } from '@/constants/types';

import Icon from './Icon';

interface ModeToggleProps {
  variant?: DeviceType;
}

// @todo - i18next for labels

const ModeToggle = (props: ModeToggleProps) => {
  const { variant = 'mobile' } = props;
  const { setTheme } = useTheme();

  const [themeName, setThemeName] = useState('Light');

  const MobileButton = (
    <Button
      variant='ghost'
      size='icon'
    >
      <Icon
        name={'sun'}
        className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
      />
      <Icon
        name={'moon'}
        className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );

  const DesktopButton = (
    <span className={'flex w-28 justify-center hover:cursor-pointer'}>
      <Button
        variant='ghost'
        id={'modeToggle'}
        className={'w-full'}
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
        <span className='sr-only'>Toggle theme</span>
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
            setThemeName('Light');
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
            setThemeName('Dark');
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
            setThemeName('System');
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
