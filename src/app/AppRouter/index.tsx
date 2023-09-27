import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import ScrollToTop from '@/components/ui/scroll-to-top';
import { RoutePath } from '@/constants';
import About from '@/features/Additional/About';
import Changelog from '@/features/Additional/Changelog';
import PrivacyPolicy from '@/features/Additional/PrivacyPolicy';
import TermsOfService from '@/features/Additional/TermsOfService';
import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';
import NotFoundRoute from '@/features/ErrorBoundaries/NotFoundRoute';
import Favourites from '@/features/Favourites';
import HeroesCharts from '@/features/HeroesCharts';
import HeroesComparison from '@/features/HeroesComparison';
import HeroesGallery from '@/features/HeroesGallery';
import Quiz from '@/features/Quiz';
import Titans from '@/features/Titans';

import Init from './Init';

const RouterComponents = () => (
  <>
    <Init />
    <ScrollToTop />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <RouterComponents />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePath.LANDING,
        element: (
          <Navigate
            to={RoutePath.HEROES_GALLERY}
            replace
          />
        )
      },
      {
        path: RoutePath.HEROES_GALLERY,
        element: <HeroesGallery />
      },
      {
        path: RoutePath.HEROES_CHARTS,
        element: <HeroesCharts />
      },
      {
        path: RoutePath.HEROES_COMPARISON,
        element: <HeroesComparison />
      },
      {
        path: RoutePath.TITANS,
        element: <Titans />
      },
      {
        path: RoutePath.FAVOURITES,
        element: <Favourites />
      },
      {
        path: RoutePath.QUIZ,
        element: <Quiz />
      },
      {
        path: RoutePath.ABOUT,
        element: <About />
      },
      {
        path: RoutePath.CHANGELOG,
        element: <Changelog />
      },
      {
        path: RoutePath.PRIVACY_POLICY,
        element: <PrivacyPolicy />
      },
      {
        path: RoutePath.TERMS_OF_SERVICE,
        element: <TermsOfService />
      },
      {
        path: '*',
        element: <NotFoundRoute />
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
