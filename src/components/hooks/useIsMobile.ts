import { useCallback, useEffect, useState } from 'react';

import { MOBILE_WIDTH_BREAKPOINT } from '@/constants/constants';

const useIsMobile = (maxWidthBreakpoint = MOBILE_WIDTH_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= maxWidthBreakpoint);

  const handleCheckSize = useCallback(() => {
    if (window.innerWidth <= maxWidthBreakpoint) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [maxWidthBreakpoint]);

  useEffect(() => {
    window.addEventListener('resize', handleCheckSize);
    window.addEventListener('orientationchange', handleCheckSize);

    return () => {
      window.removeEventListener('resize', handleCheckSize);
      window.removeEventListener('orientationchange', handleCheckSize);
    };
  }, [handleCheckSize]);

  return isMobile;
};

export default useIsMobile;
