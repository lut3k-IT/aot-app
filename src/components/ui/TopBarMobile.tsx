import { Link } from 'react-router-dom';
import { t } from 'i18next';

import { RoutePath } from '@/constants/enums';

import { Button } from './Button';
import { Dialog, DialogContentSidebar, DialogTrigger } from './Dialog';
import Icon from './Icon';
import { ModeToggle } from './ModeToggle';
import SidebarMobile from './SidebarMobile';

const TopBarMobile = () => {
  const SidebarAndButton = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          iconName={'menu'}
          size={'icon'}
          variant={'ghost'}
          iconSize={'lg'}
        />
      </DialogTrigger>
      <DialogContentSidebar
        forceMount
        className={
          'h-full w-[262px] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-300 inset-y-0 right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
        }
      >
        <SidebarMobile />
      </DialogContentSidebar>
    </Dialog>
  );

  return (
    <div className='w-full h-12 flex items-center px-page-mobile gap-2 bg-background border-b z-20 fixed'>
      <Link
        to={RoutePath.LANDING}
        className='flex gap-2 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      >
        <Icon
          name={'aotLg'}
          size={'lg'}
        />
        <div className='text-xl font-bold'>{t('common:brand')}</div>
      </Link>
      <div className='flex flex-row-reverse flex-1 gap-0'>
        <SidebarAndButton />
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
