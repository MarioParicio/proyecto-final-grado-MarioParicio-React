import React from 'react'
import useBocateria from "../hooks/useBocateria";
import { formatearDinero } from '../helpers';

export default function MisOrdenes() {
    const {userOrders} = useBocateria()
    console.log(userOrders)

    return (
        
        <div>
           
 
        <div className='m-5'>
            <h1 className='text-4xl  font-bold'>Mis pedidos</h1>
            <p className='text-xl my-10'>Aquí puedes ver todos los pedidos que has realizado</p>
         

            

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
            
                                <p className='text-lg  '>Nombre: {bocadillo.bocadilloName}</p> 
                                
                                <p className='text-lg  '>
                                    Cantidad: {bocadillo.cantidad}

                                </p>
                                
                                <p className='text-lg '>
                                    Fecha: {order.dateOrder}
                                </p>
                                <p className='text-lg  '>
                                    Nota: {bocadillo.nota}
                                </p>
                            </div> 
                        )) 
                        }
                      
                       
                        <p className='text-lg font-bold '>
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
