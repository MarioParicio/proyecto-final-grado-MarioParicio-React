import { formatearDinero } from "../helpers"
import useBocateria from "../hooks/useBocateria"
import ResumenProducto from "./ResumenProducto"
export default function Resumen() {
  const {pedido, total, makeOrder} = useBocateria()
  const comprobarPedido = () =>pedido.length === 0

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi pedido
        </h1>      
        <p className="text-lg my-5">
          Aquí podrás ver el resumen y totales de tu pedido
        </p>

        <div className="py-10">
          {pedido.length === 0 ? (
            <p className="text-center text-2xl">No hay productos en tu pedido aún
            </p> 
          ) : (
            pedido.map((producto) => (
              <ResumenProducto
              producto={producto}
              key={producto.id}
              />
            
          ))
        )}

          <p className="text-xl mt-10">
            Total: {''}
            {formatearDinero(total)}
          </p>

          <form className="w-full">
            <div className="mt-5">
            <button
            className={`${
              comprobarPedido()
                ? 'bg-indigo-100'
                : 'bg-indigo-600 hover:bg-indigo-800'
            } text-center text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer`}
            disabled={comprobarPedido()}
            onClick={(event) => {
              event.preventDefault();
              makeOrder();
            }}
          >
            Realizar pedido
          </button>

            </div>


          </form>


        </div>
    
    </aside>
  )
}
 