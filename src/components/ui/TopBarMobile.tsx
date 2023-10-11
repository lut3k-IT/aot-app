import { Link } from 'react-router-dom';
import { t } from 'i18next';

import { RoutePath } from '@/constants';

import { Button } from './Button';
import Icon from './Icon';
import { ModeToggle } from './ModeToggle';

const TopBarMobile = () => {
  return (
    <div className='w-full h-12 flex items-center px-page-mobile gap-2 bg-background border-b'>
      <Link
        to={RoutePath.LANDING}
        className='flex gap-2'
      >
        <Icon
          name={'aotLg'}
          size={'lg'}
        />
        <div className='text-xl font-bold'>{t('common:brand')}</div>
      </Link>
      <div className='flex flex-row-reverse flex-1 gap-0'>
        <Button
          iconName={'menu'}
          size={'icon'}
          variant={'ghost'}
          iconSize={'lg'}
        />
        <ModeToggle />
        <Button
          iconName={'helpCircle'}
          size={'icon'}
          variant={'ghost'}
          iconProps={{ variant: 'gray' }}
        />
      </div>
    </div>
  );
};

export default TopBarMobile;
