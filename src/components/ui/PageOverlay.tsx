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
        className={'pb-body-pad-end [&>*]:px-4'}
      >
        <Outlet />
      </div>
      <NavigationMobile />
    </>
  );
};

export default PageOverlay;
