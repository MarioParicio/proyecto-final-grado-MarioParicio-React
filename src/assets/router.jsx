import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';

import Resumen from '../components/Resumen';





const router = createBrowserRouter([
    {
      path: '/',
     // element: <Navigate to="/auth/login" />,
        element: <Layout />,
        children: [
          {
            path: '/inicio',
            element: <Inicio />,
          },
          {
            path: '/resumen',
            element: <Resumen />,
          },
          {
            path: '/',
            element: <Navigate to="/inicio" replace />,
          },
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
      path: '/home',
      element: <Inicio />,
    },
  ]);
  
  export default router;