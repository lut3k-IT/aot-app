'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { getFirstSegmentFromCurrentRoute } from '@/utils/helpers';

const useIsMatchingRouteSegment = (route: string, nthSegment: number = 1): boolean => {
  const [isMatching, setIsMatching] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const currentSegment = getFirstSegmentFromCurrentRoute();
    setIsMatching(currentSegment === route.split('/')[nthSegment]);
  }, [pathname, route, nthSegment]);

  return isMatching;
};

export default useIsMatchingRouteSegment;
