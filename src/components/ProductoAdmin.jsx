import { formatearDinero } from "../helpers";
import useBocateria from "../hooks/useBocateria";

function ProductoAdmin({ bocadillo }) {
    const { toggleBocadilloStatus } = useBocateria();
    const {  name, photoUrl, price, description, active } = bocadillo;
  
    return (
      <div className="border p-3 shadow bg-white">
        <div className="relative w-full" style={{ paddingTop: '55%' }}> 
          <img
            alt={`imagen ${name}`}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            src={photoUrl}
          />
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-lg mt-2">{description}</p>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatearDinero(price)}
          </p>
          <button
          type="button"
          className={`text-white w-full p-3 mt-5 uppercase font-bold ${bocadillo.active ? 'bg-green-600 hover:bg-green-800' : 'bg-indigo-600 hover:bg-indigo-800'}`}
          onClick={() => {
            toggleBocadilloStatus(bocadillo.id);
          }}
        >
          {bocadillo.active ? 'Desactivar' : 'Activar'}
        </button>
        </div>
      </div>
    );
  }
  
  export default ProductoAdmin;