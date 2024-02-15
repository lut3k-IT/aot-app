import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getFirstSegmentFromCurrentRoute } from '@/utils/helpers';

const useIsMatchingRouteSegment = (route: string, nthSegment: number = 1): boolean => {
  const [isMatching, setIsMatching] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentSegment = getFirstSegmentFromCurrentRoute();
    setIsMatching(currentSegment === route.split('/')[nthSegment]);
  }, [location.pathname, route]);

  return isMatching;
};

export default useIsMatchingRouteSegment;
