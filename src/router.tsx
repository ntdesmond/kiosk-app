import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Menu from './pages/menu/Menu';
import Contacts from './pages/Contacts';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
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
