import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import PageOverlay from '@/components/ui/PageOverlay';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { RoutePath } from '@/constants';
import About from '@/features/Additional/About';
import Changelog from '@/features/Additional/Changelog';
import PrivacyPolicy from '@/features/Additional/PrivacyPolicy';
import TermsOfService from '@/features/Additional/TermsOfService';
import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';
import NotFoundRoute from '@/features/ErrorBoundaries/NotFoundRoute';
import Heroes from '@/features/Heroes';
import HeroesCharts from '@/features/HeroesCharts';
import HeroesComparison from '@/features/HeroesComparison';
import HeroesGallery from '@/features/HeroesGallery';
import Quiz from '@/features/Quiz';
import Titans from '@/features/TitansGallery';

import Init from './Init';
import Favorites from '@/features/Favorites';
import FavoritesHeroes from '@/features/FavoritesHeroes';
import FavoritesTitans from '@/features/FavoritesTitans';
import FavoritesQuotations from '@/features/FavoritesQuotations';
import HeroDetailsModal from '@/features/HeroDetails';

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
        element: <PageOverlay />,
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
            element: <HeroDetailsModal />
          },
          {
            path: RoutePath.TITANS,
            element: <Titans />
          },
          {
            path: RoutePath.TITAN_DETAILS + '/:id',
            element: (
              <Navigate
                to={RoutePath.HEROES}
                replace
              />
            )
          },
          {
            path: RoutePath.FAVORITES,
            element: <Favorites />,
            children: [
              {
                path: RoutePath.FAVORITES_HEROES,
                element: <FavoritesHeroes />
              },
              {
                path: RoutePath.FAVORITES_TITANS,
                element: <FavoritesTitans />
              },
              {
                path: RoutePath.FAVORITES_QUOTATIONS,
                element: <FavoritesQuotations />
              }
            ]
          },
          {
            path: RoutePath.QUIZ,
            element: <Quiz />
          },
          {
            path: RoutePath.QUOTATIONS,
            element: (
              <Navigate
                to={RoutePath.HEROES}
                replace
              />
            )
          },
          {
            path: RoutePath.QUOTATION_DETAILS + '/:id',
            element: (
              <Navigate
                to={RoutePath.HEROES}
                replace
              />
            )
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
