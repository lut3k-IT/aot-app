import AotLogo from './AotLogo';
import AppVersionBadge from './AppVersionBadge';
import BuyMeACoffee from './BuyMeACoffee';
import LanguageSwitcher from './LanguageSwitcher';
import ModeToggle from './ModeToggle';
import NavigationDesktop from './NavigationDesktop';
import SwitchSpoilerMode from './SwitchSpoilerMode';

const SidebarDesktop = () => {
  return (
    <div className={'flex h-full w-full flex-col gap-6'}>
      <AotLogo className={'px-3 py-1.5'} />
      <NavigationDesktop />
      <div className={'flex-1'}></div>
      <BuyMeACoffee className={'mx-auto'} />
      <SwitchSpoilerMode className={'my-4 self-center'} />
      <div className={'flex justify-center gap-3'}>
        <ModeToggle variant={'desktop'} />
        <LanguageSwitcher variant={'desktop'} />
      </div>
      <AppVersionBadge className={'self-center'} />
    </div>
  );
};

export default SidebarDesktop;
