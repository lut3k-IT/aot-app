import AotLogo from './AotLogo';
import AppVersionBadge from './AppVersionBadge';
import LanguageSwitcher from './LanguageSwitcher';
import ModeToggle from './ModeToggle';
import NavigationDesktop from './NavigationDesktop';
import SwitchSpoilerMode from './SwitchSpoilerMode';

const SidebarDesktop = () => {
  return (
    <div className={'flex h-full w-full flex-col gap-6'}>
      <AotLogo className={'px-1'} />
      <NavigationDesktop />
      <div className={'flex-1'}></div>
      <SwitchSpoilerMode className={'self-center'} />
      <div className={'flex justify-center gap-3'}>
        <ModeToggle variant={'desktop'} />
        <LanguageSwitcher variant={'desktop'} />
      </div>
      <AppVersionBadge className={'self-center'} />
    </div>
  );
};

export default SidebarDesktop;
