import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Menu from './pages/menu/Menu';
import Contacts from './pages/Contacts';
import NewRequest from './pages/NewRequest';
import Feedback from './pages/Feedback';
import Manuals from './pages/faq/Manuals';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: 'manuals',
        element: <Manuals />,
      },
      {
        path: 'request',
        element: <NewRequest />,
      },
      {
        path: 'contact',
        element: <Contacts />,
      },
      {
        path: 'feedback',
        element: <Feedback />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
