import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import PageOverlay from '@/components/ui/PageOverlay';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { RoutePath } from '@/constants/enums';
import About from '@/features/Aside/About';
import TermsAndConditions from '@/features/Aside/TermsAndConditions';
import HeroDetails from '@/features/Details/HeroDetails';
import TitanDetails from '@/features/Details/TitanDetails';
import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';
import NotFoundRoute from '@/features/ErrorBoundaries/NotFoundRoute';
import Heroes from '@/features/Heroes';
import HeroesCharts from '@/features/Heroes/components/HeroesCharts';
import HeroesComparison from '@/features/Heroes/components/HeroesComparison';
import HeroesGallery from '@/features/Heroes/components/HeroesGallery';
import Quiz from '@/features/Quiz';
import QuotationDetails from '@/features/QuotationDetails';
import Quotations from '@/features/Quotations';
import Titans from '@/features/TitansGallery';

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
    path: RoutePath.LANDING,
    element: <PageOverlay />,
    children: [
      {
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
            path: RoutePath.TERMS_OF_SERVICE,
            element: <TermsAndConditions />
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
