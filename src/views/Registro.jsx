import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (error) {
      console.error(error);
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

            Nombre
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="Escribe tu nombre"
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
      <nav className="mt-10 flex justify-center">

      <Link to="/auth/login" className="text-blue-500 hover:text-blue-600 font-bold">¿Ya tienes cuenta? Inicia sesión
      </Link>

</nav>
    </div>
    </>
    )
}