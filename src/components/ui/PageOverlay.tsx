import { Outlet } from 'react-router-dom';

import NavigationMobile from './NavigationMobile';
import QuoteBarMobile from './QuoteBarMobile';
import TopBarMobile from './TopBarMobile';

const PageOverlay = () => {
  return (
    <>
      <TopBarMobile />
      <QuoteBarMobile />
      <div
        id='inner'
        className={'[&>*]:px-4'}
      >
        {/* pt-body-start relative */}
        <Outlet />
      </div>
      <NavigationMobile />
    </>
  );
};

export default PageOverlay;
