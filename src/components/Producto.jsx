import { formatearDinero } from "../helpers";
import useBocateria from "../hooks/useBocateria";

function Producto({ bocadillo }) {
    const { handleClickModal, handleSetBocadillo } = useBocateria();
    const {  name, photoUrl, price, description } = bocadillo;
  
    return (
      <div className="border p-3 shadow bg-white flex flex-col justify-between">
        <div>
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
          </div>
        </div>
        <div className="pl-5 pr-5 pb-2">
          <p className="mt-0 font-black text-4xl text-amber-500">
            {formatearDinero(price)}
          </p>
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800  text-white w-full p-3  mt-5 uppercase font-bold"
            onClick={() => {
              handleSetBocadillo(bocadillo);
              handleClickModal();
              
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    );
  }
  
  export default Producto;
