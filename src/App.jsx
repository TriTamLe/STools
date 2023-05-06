import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import HomePage, { loader as homeLoader } from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import ErrorPage from './pages/ErrorPage';
import NewSkillPage from './pages/NewsSkillPage';
import { action as newSkillAction } from './components/NewSkillForm';
import SKillContentPage, {
  loader as contentLoader,
} from './pages/SkillContentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    id: 'home',
    loader: homeLoader,
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
            loader: contentLoader,
          },
          {
            path: 'create',
            element: <NewSkillPage />,
            action: newSkillAction,
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
