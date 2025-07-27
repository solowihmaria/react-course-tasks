import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { MainPage } from '../pages/Main/MainPage';
import { AboutPage } from '../pages/About/AboutPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
