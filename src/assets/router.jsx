import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';
import PrivateRoute from './PrivateRoute';
import AdminLayout from "../layout/AdminLayout";
import Ordenes from '../views/Ordenes';

import AdminRoute from './AdminRoute';
import Usuarios from '../views/Usuarios';
import Bocadillos from '../views/Bocadillos';
import MisOrdenes from '../views/MisOrdenes';


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
      {
        path: '/mis-pedidos',
        element: <PrivateRoute><MisOrdenes /></PrivateRoute>,
      }
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
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    children: [
      {
        index: true,
        element: <Ordenes />,
      },
      {
        path: '/admin/bocadillos',
        element: <Bocadillos/>,
      },
      {
        path: '/admin/usuarios',
        element: <Usuarios/>,
      }
    ]
  }
]);

export default router;