import { useEffect, useState } from 'react';

import { MOBILE_WIDTH_BREAKPOINT } from '@/constants/constants';

const useIsMobile = (breakpoint = MOBILE_WIDTH_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakpoint);

  const handleCheckSize = () => {
    if (window.innerWidth <= breakpoint) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleCheckSize);

    return () => {
      window.removeEventListener('resize', handleCheckSize);
    };
  }, [handleCheckSize]);

  return isMobile;
};

export default useIsMobile;
