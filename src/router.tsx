import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Menu from './pages/menu/Menu';
import Contacts from './pages/Contacts';
import NewRequest from './pages/forms/NewRequest';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
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
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
