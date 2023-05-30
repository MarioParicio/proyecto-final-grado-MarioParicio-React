import Producto from "../components/Producto"

import useBocateria from "../hooks/useBocateria"

export default function Inicio() {

  const {categoriaActual} = useBocateria()
  const {activeBocadillos} = useBocateria()
  console.log(activeBocadillos)

  return (
    <>
      <h1 className="text-4xl font-black md:mx-5">{categoriaActual.nombre}</h1>
        <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>


        <div className="grid gap-4 grid-cols-1 md:grid-cols-2  xl:grid-cols-3"> 
      

                {activeBocadillos.map(bocadillo => (
          <Producto
            key={bocadillo.name} // assuming 'id' is a unique identifier in 'bocadillo' object
            bocadillo={bocadillo}
          />
        ))}


        </div>
    
    </>
  )
}
