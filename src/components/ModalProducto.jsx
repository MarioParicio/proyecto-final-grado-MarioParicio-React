import { useState, useEffect } from "react";
import useBocateria from "../hooks/useBocateria";
import { formatearDinero } from "../helpers";

export default function ModalProducto() {
    const { bocadillo, handleClickModal, handleAgregarPedido, pedido } = useBocateria();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    const [nota, setNota] = useState(bocadillo.nota); // To store the note

    

    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === bocadillo?.id)) {
            const { cantidad } = pedido.find((pedidoState) => pedidoState.id === bocadillo.id);
            setCantidad(cantidad);
            setEdicion(true);
        }
    }, [pedido]);

    if (!bocadillo) {
        console.log("bocadillo", bocadillo);
        return null; // Manejar el caso cuando el bocadillo es undefined
    }

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <img alt={`imagen ${bocadillo.name}`} src={bocadillo.photoUrl} 
               
                />

            </div>

            <div className="md:w-2/3">
            <div className="flex justify-end">
        <button onClick={handleClickModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-red-400">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>
                <div className="flex justify-end">
                    <button onClick={handleClickModal}>
                        {/* SVG code omitted for brevity */}
                    </button>
                </div>
                <h1 className="text-3xl font-bold">{bocadillo.name}</h1>
                <p className="mt-5">{bocadillo.description}</p>
                <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(bocadillo.price * cantidad)}</p>

                
                <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={() => {cantidad > 1 && setCantidad(cantidad - 1)}}

                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                

                </button>

                <p className="text-3xl">{cantidad}</p>
                <button
                    type="button"
                    onClick={() =>{cantidad <= 10 && setCantidad(cantidad + 1)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

            </div>

                <div className="mt-5">
                    <label className="block text-xl font-bold mb-2">Añadir una nota:</label>
                    <textarea 
                        value={nota} 
                        onChange={(e) => setNota(e.target.value)} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Escribe una nota aquí..."
                    />
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800  px-5 py-2 mt-5 uppercase text-white font-bold rounded"
                    onClick={() => {
                        handleAgregarPedido({ ...bocadillo ,cantidad, nota});
                        handleClickModal();
                    }}
                >
                    {edicion ? "Guardar cambios" : "Añadir al pedido"}
                </button>
               
            </div>
        </div>
    );
}
