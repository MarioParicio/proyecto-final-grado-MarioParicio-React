import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useLogin from "../hooks/useLogin";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Link } from "react-router-dom";

export default function Registro() {

  const { register, loginWithGoogle } = useLogin(); // Get the login function from the useLogin hook


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden");
      console.error("Passwords do not match");
      return;
    }
    //Name is blank
    if (name === "") {
      toast.error("El nombre no puede estar vacío");
      console.error("Name is blank");
      return;
    }   

    try {
      const success = await register(email, password, name);
      if (success) {
        navigate("/"); // Navigate to the home page
        consol.log("Inicio de sesión exitoso");
      }
      
    } catch (error) {
      console.error(error);
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
    <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
    <p>Crea tu cuenta llenando el formulario</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            />

            Nombre completo
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="Escribe tu  nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

        
        </div>

        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="Escribe tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          

        
        </div>

        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Repite contraseña
            </label>
            <input
              type="password"
              id="password-confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password-confirmation"
              placeholder="Repite tu contraseña"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg-red-500 hover:bg-red-600 w-full p-3 text-white uppercase font-bold cursor-pointer"
          />
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
  Accede con Google
</button>
      <nav className="mt-10 flex justify-center">

      <Link to="/auth/login" className="text-blue-500 hover:text-blue-600 font-bold">¿Ya tienes cuenta? Inicia sesión
      </Link>


</nav>
    </div>
    </>
    )
}