import { createBrowserRouter, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';
import LoginContext from '../context/LoginProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(LoginContext);

  // Si currentUser es null o undefined, redirige al usuario a /auth/login
  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  // De lo contrario, renderiza el componente solicitado
  return children;
};
export default PrivateRoute;
