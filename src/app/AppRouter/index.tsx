import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';

import PageOverlay from '@/components/ui/PageOverlay';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { CharacterType, RoutePath } from '@/constants/enums';
import About from '@/features/Additional/About';
import Changelog from '@/features/Additional/Changelog';
import PrivacyPolicy from '@/features/Additional/PrivacyPolicy';
import TermsOfService from '@/features/Additional/TermsOfService';
import CharacterDetails from '@/features/CharacterDetails';
import ErrorPage from '@/features/ErrorBoundaries/ErrorPage';
import NotFoundRoute from '@/features/ErrorBoundaries/NotFoundRoute';
import Favorites from '@/features/Favorites/Favorites';
import FavoritesHeroes from '@/features/Favorites/FavoritesHeroes';
import FavoritesQuotations from '@/features/Favorites/FavoritesQuotations';
import FavoritesTitans from '@/features/Favorites/FavoritesTitans';
import Heroes from '@/features/Heroes';
import HeroesCharts from '@/features/Heroes/components/HeroesCharts';
import HeroesComparison from '@/features/Heroes/components/HeroesComparison';
import HeroesGallery from '@/features/Heroes/components/HeroesGallery';
import Quiz from '@/features/Quiz';
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
            element: <CharacterDetails type={CharacterType.HERO} />
          },
          {
            path: RoutePath.TITANS,
            element: <Titans />
          },
          {
            path: RoutePath.TITAN_DETAILS + '/:id',
            element: <CharacterDetails type={CharacterType.TITAN} />
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
