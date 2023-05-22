import { createBrowserRouter, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';
import LoginContext from '../context/LoginProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminRoute = ({ children }) => {
  const { currentUser, role } = useContext(LoginContext);

  // Si currentUser es null o undefined, redirige al usuario a /auth/login
  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  // Si el rol no es 'admin', redirige al usuario a /
  if (role !== 'admin') {
    console.log("Rol: " + role);
    toast.error('No tienes permisos para acceder a esta página');

    return <Navigate to="/" replace />;
  }

  // De lo contrario, renderiza el componente solicitado
  return children;
};
export default AdminRoute;
