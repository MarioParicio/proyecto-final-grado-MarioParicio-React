import React from 'react'
import useBocateria from "../hooks/useBocateria";
import { formatearDinero } from '../helpers';

export default function MisOrdenes() {
    const {userOrders} = useBocateria()
    console.log(userOrders)

    return (
        
        <div>
           
 
        <div className='m-5'>
            <h1 className='text-4xl  font-bold'>Ordenes</h1>
            <p className='text-xl my-10'>Administra las ordenes desde aquí</p>
         

            

        </div>
            <div  className='grid grid-cols-2 gap-5'>
                {userOrders.map(order => (
                    <div key={order.id} className='p-5 bg-white shadow space-y-2 border-b '>
                        <p className='text-xl font-bold text-slate-600'>Contenido del pedido:</p> 

                        {

                        order.bocadillos_order.map(bocadillo => (
                            <div 
                            key={bocadillo.uid}
                            className='border-b  border-b-slate-200  last-of-type:border-nome  py-4'
                            >
                                <p className='text-sm'>ID: {bocadillo.uid} </p> 
                                <p className='text-base font-bold'>Nombre: {bocadillo.bocadilloName}</p> 
                                
                                <p className='font-bold'>
                                    Cantidad: {bocadillo.cantidad}

                                </p>
                                <p>
                                    Nota: {bocadillo.nota}
                                </p>
                            </div> 
                        )) 
                        }
                        <p className='text-lg font-bold text-amber-600'>
                            Cliente: {''}
                            <span className='font-normal '>{order.nameClient}

                            </span>

                        </p>
                        <p className='text-lg font-bold text-amber-600'>

                            Email: {''}
                            <span className='font-normal '>{order.email}
                            </span>
                        </p>
                        <p className='text-lg font-bold text-amber-600'>
                            Total a pagar: {''}
                           <span className='font-normal text-slate-600'>{formatearDinero( order.total)}

                            </span>
                        </p>
                  
                    </div>  
                ))}
            </div>
        </div>
    )
}
