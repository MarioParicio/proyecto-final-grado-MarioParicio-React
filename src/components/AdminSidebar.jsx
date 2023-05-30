import React from 'react'
import  {Link, Outlet} from 'react-router-dom';
import LoginContext from '../context/LoginProvider';
import { useContext } from "react";
export default function AdminSidebar() {


    const { logout } = useContext(LoginContext);
  return (

    <aside className='md:w-72 h-screen'>
        <div className='p-4'>
            <img
            alt="logo"
             className="w-70"
             src="/img/iconoQueFlipas.png"
            
            />
        </div>
        <nav className='flex flex-col'>
            

     

        <Link to="/admin" className='font-bold text-lg flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer'>
    <img src="/img/pedido.png" alt="Logo Ordenes" className="h-14 w-14" /> 

    Ordenes
</Link>

<Link to="/admin/bocadillos" className='font-bold text-lg flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer'>
    <img src={`../img/icono_sandwich.png`} alt="Logo Bocadillos" className="h-14 w-14" /> 

    Bocadillos
</Link>

<Link to="/admin/usuarios" className='font-bold text-lg flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer'>
    <img src="/img/logo_usuarios.png" alt="Logo Usuarios" className="h-14 w-14" /> 
    Usuarios
</Link>

        </nav>

        <div className='my-5 px-5'>
        <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate uppercase rounded-md hover:bg-red-600"
                    onClick={() => {
                      console.log("logout");
                      logout()} }
                > 
                 Cerrar sesión
                </button>
        </div>
        
      
    </aside>
  )
}
