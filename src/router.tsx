import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Menu from './pages/menu/Menu';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;
