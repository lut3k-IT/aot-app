'use client';

import { usePathname } from 'next/navigation';

/**
 * Hook to check if the current route segment matches the given route
 * @param route - The route to match against (e.g., /app/heroes)
 * @param nthSegment - Which segment to compare (default 2 for /app/X routes)
 */
const useIsMatchingRouteSegment = (route: string | string[], nthSegment: number = 2): boolean => {
  const pathname = usePathname();

  const routes = Array.isArray(route) ? route : [route];
  const pathSegments = pathname.split('/').filter(Boolean);
  const pathSegment = pathSegments[nthSegment - 1];

  return routes.some((r) => {
    const routeSegments = r.split('/').filter(Boolean);
    const routeSegment = routeSegments[nthSegment - 1];

    return routeSegment === pathSegment;
  });
};

export default useIsMatchingRouteSegment;
