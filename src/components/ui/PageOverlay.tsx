import { Outlet } from 'react-router-dom';

import NavigationMobile from './NavigationMobile';
import QuoteBarMobile from './QuoteBarMobile';
import TopBarMobile from './TopBarMobile';

const PageOverlay = () => {
  // 1. top bar
  // 2. quote bar
  // 3. mobile navigation
  // 4. mobile menu (overlay)

  return (
    <>
      <TopBarMobile />
      <QuoteBarMobile />
      <div id='inner'>
        <Outlet />
      </div>
      <NavigationMobile />
    </>
  );
};

export default PageOverlay;
