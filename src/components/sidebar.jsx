import useBocateria from "../hooks/useBocateria"
import Categoria from "./Categoria"
export default function Sidebar() {

   const {categorias} = useBocateria()
  return (
    <aside className="md:w-72">

      <div className="p-4">
          <img
              className="w-70"
              src="/img/iconoQueFlipas.png"
          />
      <div className="mt-10">
          {categorias.map(categoria  => (

              <Categoria
              key={categoria.id}
              categoria={categoria}
              />
          ))}

        </div>

      </div>
        <div className="my-5 px-5">
            <button
                type="button"
                className="text-center bg-red-500 w-full p-3 font-bold text-white truncate">
                  Cancelar Orden
            </button>

        </div>
                
              
    
    </aside>
  )
}
