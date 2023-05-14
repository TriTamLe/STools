import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const RootPage = lazy(() => import('./pages/RootPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NewSkillPage = lazy(() => import('./pages/NewsSkillPage'));
const SKillContentPage = lazy(() => import('./pages/SkillContentPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: 'home',
    loader: () => import('./pages/HomePage').then(module => module.loader()),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'skills',
        children: [
          {
            index: true,
            element: <GuidePage />,
          },

          {
            path: ':skillId',
            element: <SKillContentPage />,
            loader: meta =>
              import('./pages/SkillContentPage').then(module =>
                module.loader(meta),
              ),
          },
          {
            path: 'create',
            element: <NewSkillPage />,
            action: meta =>
              import('./components/NewSkillForm').then(module =>
                module.action(meta),
              ),
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
