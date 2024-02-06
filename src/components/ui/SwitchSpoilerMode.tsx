import { t } from 'i18next';

import { cn } from '@/lib/utils';

import { Label } from './Label';
import { Switch } from './Switch';

interface SwitchSpoilerModeProps {
  className?: string;
}

const SwitchSpoilerMode = (props: SwitchSpoilerModeProps) => {
  const { className } = props;

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <Switch id='spoiler-mode' />
      <Label
        htmlFor='spoiler-mode'
        className='text-md font-medium leading-none'
      >
        {t('common:spoilerMode.hide')}
      </Label>
    </div>
  );
};

export default SwitchSpoilerMode;
