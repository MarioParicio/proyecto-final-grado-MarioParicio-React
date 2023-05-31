import useBocateria from "../hooks/useBocateria";
import { useNavigate } from 'react-router-dom';

export default function Categoria({categoria}) {
  const {handleClickCategoria, categoriaActual} = useBocateria();
  const {icono, id , nombre, link} = categoria;
  const navigate = useNavigate();
  return <button className={`flex items-center gap-4 border w-full p-3 
  hover:bg-amber-400 cursor-pointer ${categoriaActual.id === id && "bg-amber-400"}`}
  onClick={() => {

    handleClickCategoria(id);
    
    navigate(link); // Navegar a la nueva ruta
  }}
  >
    
    <img className="w-14" src={`../img/${icono}.png`} alt={nombre}/>
    <p className="text-lg font-bold cursor-pointer truncate" 
           >
            
                {nombre}
      </p>
    
    
    </button>
}

