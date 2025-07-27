import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { Layout } from '../components/Layout/Layout';
import { MainPage } from '../pages/Main/MainPage';
import { AboutPage } from '../pages/About/AboutPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Layout>
          <Outlet />
        </Layout>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/1" replace />,
      },
      {
        path: '/:page',
        element: <MainPage />,
        children: [
          {
            path: ':pokemonId',
          },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
