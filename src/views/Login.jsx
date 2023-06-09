import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useLogin from "../hooks/useLogin";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Link } from "react-router-dom";




export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useLogin();



  
  const handleSubmit = async (e) => {
   
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/"); // Navigate to the home page
      console.log("Inicio de sesión exitoso");
    }
    

  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    
    const success = await loginWithGoogle();
    
    if (success) {
      navigate("/");
      console.log("Inicio de sesión exitoso");
    }
  };

  return (
    <>
    <h1 className="text-4xl font-bold">Inicia sesión</h1>
    <p>Para entrar debes inciar sesión</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <input
        type="email"
        id="email"
        className="mt-2 w-full p-3 bg-gray-50"
        name="email"
        placeholder="Escribe tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* ... */}
      <input
        type="password"
        id="password"
        className="mt-2 w-full p-3 bg-gray-50"
        name="password"
        placeholder="Escribe tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* ... */}
      <input
        type="submit"
        value="Iniciar sesion"
        className="bg-red-500 hover:bg-red-600 w-full p-3 text-white uppercase font-bold cursor-pointer"
      
      />
      {/* ... */}
    </form>
    <button
  onClick={handleGoogleLogin}
  className="mt-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer"
>
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
    alt="Google logo" 
    className="h-5 w-5 mr-2"
  />
  Iniciar sesión con Google
</button>
    </div>
    <nav className="mt-10 flex justify-center">

          <Link to="/auth/register" className="text-blue-500 hover:text-blue-600 font-bold">¿No tienes cuenta? Registrate
          </Link>

    </nav>
    
    </>
  )
}
