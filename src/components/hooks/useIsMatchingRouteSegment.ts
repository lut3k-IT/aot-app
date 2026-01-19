'use client';

import { usePathname } from 'next/navigation';

/**
 * Hook to check if the current route segment matches the given route
 * @param route - The route to match against (e.g., /app/heroes)
 * @param nthSegment - Which segment to compare (default 2 for /app/X routes)
 */
const useIsMatchingRouteSegment = (route: string, nthSegment: number = 2): boolean => {
  const pathname = usePathname();

  // Direct comparison using the pathname from Next.js
  const routeSegments = route.split('/').filter(Boolean);
  const pathSegments = pathname.split('/').filter(Boolean);

  // Compare the segment at the specified index
  // For /app/heroes, segments are ['app', 'heroes'], so nthSegment=1 gives 'heroes'
  const routeSegment = routeSegments[nthSegment - 1];
  const pathSegment = pathSegments[nthSegment - 1];

  return routeSegment === pathSegment;
};

export default useIsMatchingRouteSegment;
