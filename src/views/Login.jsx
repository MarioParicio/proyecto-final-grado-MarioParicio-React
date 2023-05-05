
import {Link} from 'react-router-dom'
export default function Login() {
  return (
    <>
    <h1 className="text-4xl font-bold">Inicia sesión</h1>
    <p>Para entrar debes inciar sesión</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
      <form>


        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Email
            </label>
            <input type ="email"
            id="email"
            className="mt-2 w-full p-3 bg-gray-50"
            name="email"
            placeholder="Escribe tu email"
            />
          

        
        </div>

        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Contraseña
            </label>
            <input type ="password"
            id="password"
            className="mt-2 w-full p-3 bg-gray-50"
            name="password"
            placeholder="Escribe tu email"
            />
          

        
        </div>

        <input
        type="submit"
        value="Iniciar sesion"
        className="bg-red-500 hover:bg-red-600 w-full p-3 text-white uppercase font-bold cursor-pointer"
        />


      </form>
    </div>
    <nav className="mt-10 flex justify-center">

          <Link to="/auth/register" className="text-blue-500 hover:text-blue-600 font-bold">¿No tienes cuenta? Registrate
          </Link>

    </nav>
    
    </>
  )
}
