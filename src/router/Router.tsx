import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { Layout } from '../components/Layout/Layout';
import { MainPage } from '../pages/Main/MainPage';
import { RightSide } from '../pages/Main/parts/RightSide/RightSide';

import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Layout />
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
            element: <RightSide />,
          },
        ],
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
