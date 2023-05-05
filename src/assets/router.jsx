import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';




const router = createBrowserRouter([
    {
         path : '/',
         element : <Layout />,
            children : [
                {
                    index : true,
                    element: <Inicio/>
                }
            ]

    },
    {
        path : '/auth',
        element : <AuthLayout />,
              children : [{
                    path : '/auth/register',
                    element: <Registro/>
              },
              {
                path : '/auth/login',
                index : true,
                element : <Login />
              }
            ]
    },    
  
        
])

export default router;