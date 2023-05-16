import { formatearDinero } from "../helpers";
import useBocateria from "../hooks/useBocateria";

function Producto({ producto}) {
    
    const {handleClickModal, handleSetProducto} = useBocateria() 
    const { nombre, imagen, precio } = producto
  return (
    <div className="border p-3 shadow bg-white">
        <img
            alt={`imagen ${nombre}`}
            className="w-full"

            src={`../img/${imagen}.jpg`}
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(
                precio
                )}
            </p>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800  text-white w-full p-3  mt-5 uppercase font-bold"
                onClick={() => {
                    handleClickModal();
                    handleSetProducto(producto);
                }
            }

            >
                Agregar
            </button>
        </div>
    </div>
  )
}
export default Producto; 