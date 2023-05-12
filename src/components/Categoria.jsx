import useBocateria from "../hooks/useBocateria";

export default function Categoria({categoria}) {
  const {handleClickCategoria} = useBocateria();
  const {icono, id , nombre} = categoria;
  return <button className="flex items-center gap-4 border w-full p-3 
  hover:bg-amber-400 cursor-pointer"
  onClick={() =>handleClickCategoria(id)}
  >
    
    <img className="w-14" src={`../img/icono_${icono}.svg`} alt={nombre}/>
    <p className="text-lg font-bold cursor-pointer truncate" 
           >
            
                {nombre}
      </p>
    
    
    </button>
}

