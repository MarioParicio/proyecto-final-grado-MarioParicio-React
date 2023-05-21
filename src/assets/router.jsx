import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';
import PrivateRoute from './PrivateRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        index: true,
        element: <PrivateRoute><Inicio /></PrivateRoute>,
      },
      // Asegúrate de utilizar `PrivateRoute` para todas las demás rutas que quieras proteger.
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <Registro />,
      },
      {
        path: 'login',
        index: true,
        element: <Login />,
      },
    ],
  },
]);

export default router;