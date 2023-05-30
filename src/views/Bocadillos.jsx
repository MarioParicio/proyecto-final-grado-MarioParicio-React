import React from 'react'
import useBocateria from '../hooks/useBocateria'
import ProductoAdmin from '../components/ProductoAdmin'
export default function Bocadillos() {
    const {bocadillos} = useBocateria()
  return (
    <div>
        <h1 className='text-4xl font-black'>Bocadillos</h1> 
        <p className='text-2xl my-10'>
          Maneja tus bocadillos desde aquí
        </p>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2  xl:grid-cols-3"> 
        {bocadillos.map(bocadillo => (
          <ProductoAdmin
            key={bocadillo.name} // assuming 'id' is a unique identifier in 'bocadillo' object
            bocadillo={bocadillo}
          />
        ))}
        </div>



    </div>
  )
}
 