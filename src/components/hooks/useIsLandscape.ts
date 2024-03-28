import { useEffect, useState } from 'react';

import { LANDSCAPE_HEIGHT_BREAKPOINT } from '@/constants/constants';

const useIsLandscape = (maxHeightBreakpoint = LANDSCAPE_HEIGHT_BREAKPOINT) => {
  const [isMobileLandscape, setIsMobileLandscape] = useState<boolean>(window.innerHeight <= maxHeightBreakpoint);

  const handleCheckSize = () => {
    if (window.innerHeight <= maxHeightBreakpoint) {
      setIsMobileLandscape(true);
    } else {
      setIsMobileLandscape(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleCheckSize);

    return () => {
      window.removeEventListener('resize', handleCheckSize);
    };
  }, [handleCheckSize]);

  return isMobileLandscape;
};

export default useIsLandscape;
