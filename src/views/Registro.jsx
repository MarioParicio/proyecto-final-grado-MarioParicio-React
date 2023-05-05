
import {Link} from 'react-router-dom'
export default function Registro() {
  return (
    <>
    <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
    <p>Crea tu cuenta llenando el formulario</p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
      <form>
        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Nombre
            </label>
            <input type ="text"
            id="name"
            className="mt-2 w-full p-3 bg-gray-50"
            name="name"
            placeholder="Escribe tu nombre"
            />

        
        </div>

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

        <div className="mb-4">
            <label 
            className="text-slate-800 mr-5"
            htmlFor="nombre"
            >

            Repite contraseña
            </label>
            <input type ="password"
            id="password-confirmation"
            className="mt-2 w-full p-3 bg-gray-50"
            name="password-confirmation"
            placeholder="Escribe tu email"
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