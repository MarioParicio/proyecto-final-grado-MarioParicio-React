import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Get access to the navigate function

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Redirect the user to the desired route after successful login
      navigate("/home"); // R
    } catch (error) {
      // Handle login errors here
    
      console.error(error);
    }
  };
  return (
    <>
    <h1 className="text-4xl font-bold">Inicia sesión</h1>
    <p>Para entrar debes inciar sesión</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
    <form onSubmit={handleLogin}>
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
    </div>
    <nav className="mt-10 flex justify-center">

          <Link to="/auth/register" className="text-blue-500 hover:text-blue-600 font-bold">¿No tienes cuenta? Registrate
          </Link>

    </nav>
    
    </>
  )
}
