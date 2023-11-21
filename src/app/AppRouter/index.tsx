import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import PageOverlay from '@/components/ui/PageOverlay';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { RoutePath } from '@/constants/enums';
import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';
import NotFoundRoute from '@/features/ErrorBoundaries/NotFoundRoute';
import HeroDetails from '@/features/HeroDetails';
import Heroes from '@/features/Heroes';
import HeroesCharts from '@/features/Heroes/components/HeroesCharts';
import HeroesComparison from '@/features/Heroes/components/HeroesComparison';
import HeroesGallery from '@/features/Heroes/components/HeroesGallery';
import About from '@/features/Minor/About';
import Changelog from '@/features/Minor/Changelog';
import PrivacyPolicy from '@/features/Minor/PrivacyPolicy';
import TermsOfService from '@/features/Minor/TermsOfService';
import Quiz from '@/features/Quiz';
import QuotationDetails from '@/features/QuotationDetails';
import Quotations from '@/features/Quotations';
import TitanDetails from '@/features/TitanDetails';
import Titans from '@/features/TitansGallery';

import Init from './Init';

const RouterComponents = () => (
  <>
    <Init />
    <ScrollToTop />
    <Outlet />
  </>
);

// FIXME:
export const router = createBrowserRouter([
  {
    // element: <RouterComponents />,
    // errorElement: <ErrorPage />,
    // children: [
    path: RoutePath.LANDING,
    element: <PageOverlay />,
    children: [
      {
        // path: RoutePath.LANDING,
        // element: <PageOverlay />,
        // children: [
        element: <RouterComponents />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: RoutePath.LANDING,
            element: (
              <Navigate
                to={RoutePath.HEROES}
                replace
              />
            )
          },
          {
            path: RoutePath.HEROES,
            element: <Heroes />,
            children: [
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
              }
            ]
          },
          {
            path: RoutePath.HERO_DETAILS + '/:id',
            element: <HeroDetails />
          },
          {
            path: RoutePath.TITANS,
            element: <Titans />
          },
          {
            path: RoutePath.TITAN_DETAILS + '/:id',
            element: <TitanDetails />
          },
          {
            path: RoutePath.QUOTATIONS,
            element: <Quotations />
          },
          {
            path: RoutePath.QUOTATION_DETAILS + '/:id',
            element: <QuotationDetails />
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
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
