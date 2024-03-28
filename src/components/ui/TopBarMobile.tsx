import classNames from 'classnames';

import HowToUse from '@/features/Aside/HowToUse';

import useIsLandscape from '../hooks/useIsLandscape';
import useIsMobileLandscape from '../hooks/useIsMobileLandscape';
import AotLogo from './AotLogo';
import { Button } from './Button';
import { Dialog, DialogContentSidebar, DialogTrigger } from './Dialog';
import ModeToggle from './ModeToggle';
import SidebarMobile from './SidebarMobile';

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
        'inset-y-0 right-0 h-full w-[16.375rem] transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:rounded-none'
      }
    >
      <SidebarMobile />
    </DialogContentSidebar>
  </Dialog>
);

const TopBarMobile = () => {
  const isLandscape = useIsLandscape();

  return (
    <div
      className={classNames('fixed z-30 flex h-12 w-full items-center gap-2 border-b bg-background px-page-mobile', {
        'w-[calc(100vw-5rem)]': isLandscape
      })}
    >
      <AotLogo />
      <div className='flex flex-1 flex-row-reverse gap-0'>
        <SidebarAndButton />
        <ModeToggle />
        <HowToUse />
      </div>
    </div>
  );
};

export default TopBarMobile;
