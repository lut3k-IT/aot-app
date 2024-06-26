import { LANDSCAPE_HEIGHT_BREAKPOINT, MOBILE_WIDTH_BREAKPOINT } from '@/constants/constants';

import useIsLandscape from './useIsLandscape';
import useIsMobile from './useIsMobile';

const useIsMobileOrLandscape = (
  mobileBreakpoint = MOBILE_WIDTH_BREAKPOINT,
  landscapeBreakpoint = LANDSCAPE_HEIGHT_BREAKPOINT
) => {
  const isMobileFromHook = useIsMobile(mobileBreakpoint);
  const isLandscapeFromHook = useIsLandscape(landscapeBreakpoint);

  return isMobileFromHook || isLandscapeFromHook;
};

export default useIsMobileOrLandscape;
