import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Resumen from '../components/Resumen';
import Layout from '../layout/Layout';
import AuthLayout from '../layout/AuthLayout';
import Inicio from '../views/Inicio';
import Login from '../views/Login'
import Registro from '../views/Registro';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/resumen" element={<Resumen />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<Registro />} />
        <Route path="login" index element={<Login />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;