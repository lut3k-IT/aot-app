import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { disableSpoilerMode, enableSpoilerMode } from '@/store/spoilerModeSlice';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { Label } from './Label';
import { Switch } from './Switch';

interface SwitchSpoilerModeProps {
  className?: string;
}

const SwitchSpoilerMode = (props: SwitchSpoilerModeProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const isShowingSpoilers = useAppSelector((state) => state.spoilerMode);

  const handleToggle = () => {
    if (isShowingSpoilers) {
      dispatch(disableSpoilerMode());
    } else {
      dispatch(enableSpoilerMode());
    }
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <Switch
        id='spoiler-mode'
        checked={isShowingSpoilers}
        onCheckedChange={handleToggle}
      />
      <Label
        htmlFor='spoiler-mode'
        className='text-md font-medium leading-none'
      >
        {t('common:spoilerMode.show')}
      </Label>
    </div>
  );
};

export default SwitchSpoilerMode;
