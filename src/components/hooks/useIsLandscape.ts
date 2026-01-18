import { useCallback, useEffect, useState } from 'react';

import { LANDSCAPE_HEIGHT_BREAKPOINT } from '@/constants/constants';

const useIsLandscape = (maxHeightBreakpoint = LANDSCAPE_HEIGHT_BREAKPOINT) => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

  useEffect(() => {
    setIsLandscape(window.innerHeight <= maxHeightBreakpoint);
  }, [maxHeightBreakpoint]);

  const handleCheckSize = useCallback(() => {
    if (window.innerHeight <= maxHeightBreakpoint) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [maxHeightBreakpoint]);

  useEffect(() => {
    window.addEventListener('resize', handleCheckSize);
    window.addEventListener('orientationchange', handleCheckSize);

    return () => {
      window.removeEventListener('resize', handleCheckSize);
      window.removeEventListener('orientationchange', handleCheckSize);
    };
  }, [handleCheckSize]);

  return isLandscape;
};

export default useIsLandscape;
