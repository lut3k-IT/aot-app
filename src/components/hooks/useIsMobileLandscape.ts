import { LANDSCAPE_HEIGHT_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT } from '@/constants/constants';

import useIsLandscape from './useIsLandscape';
import useIsMobile from './useIsMobile';

const useIsMobileLandscape = (
  mobileBreakpoint = MOBILE_WIDTH_BREAKPOINT,
  landscapeBreakpoint = LANDSCAPE_HEIGHT_BREAKPOINT
) => {
  const isMobile = useIsMobile(mobileBreakpoint);
  const isLandscape = useIsLandscape(landscapeBreakpoint);

  return isMobile || isLandscape;
};

export default useIsMobileLandscape;
