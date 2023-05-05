import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import HomePage, { loader as homeLoader } from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import ErrorPage from './pages/ErrorPage';
import ContructoringPage from './pages/ConstructoringPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        id: 'home',
        loader: homeLoader,
      },
      {
        path: 'skills',
        children: [
          {
            index: true,
            element: <GuidePage />,
          },
          {
            path: ':id',
            element: <ContructoringPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
