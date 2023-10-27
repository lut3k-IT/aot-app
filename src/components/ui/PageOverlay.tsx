import { Outlet } from 'react-router-dom';

import NavigationMobile from './NavigationMobile';
import QuotationBarMobile from './QuotationBarMobile';
import TopBarMobile from './TopBarMobile';

const PageOverlay = () => {
  return (
    <>
      <TopBarMobile />
      <QuotationBarMobile />
      <div
        id='inner'
        className={'[&>*]:px-4 pb-body-pad-end'}
      >
        <Outlet />
      </div>
      <NavigationMobile />
    </>
  );
};

export default PageOverlay;
