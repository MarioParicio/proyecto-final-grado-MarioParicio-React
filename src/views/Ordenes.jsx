import React from 'react'
import useBocateria from "../hooks/useBocateria";
import { formatearDinero } from '../helpers';
export default function Ordenes() {
    const {orders, handleToggleOrderStatus, selectedFilter, filteredOrders, setSelectedFilter, selectedStatus, setSelectedStatus} = useBocateria()

    return (
        
        <div>
           
 
        <div className='m-5'>
            <h1 className='text-4xl  font-bold'>Ordenes</h1>
            <p className='text-xl my-10'>Administra las ordenes desde aquí</p>
            <select
            className='p-2 border border-gray-200 rounded'
            value={selectedFilter}
            onChange={event => setSelectedFilter(event.target.value)}
        >
            <option value="Hoy">Hoy</option>
            <option value="Este mes">Este mes</option>
            <option value="Todas">Todos</option>
        </select>

        <select
            className='ml-3 p-2 border border-gray-200 rounded'
            value={selectedStatus}
            onChange={event => setSelectedStatus(event.target.value)}
        >
            <option value="">Todos</option>
            <option value="Entregados">Entregados</option>
            <option value="En proceso">En proceso</option>
        </select>

            

        </div>
            <div  className='grid grid-cols-2 gap-5'>
                {filteredOrders.map(order => (
                    <div key={order.idOrder} className='p-5 bg-white shadow space-y-2 border-b '>
                        <p className='text-xl font-bold text-slate-600'>Contenido del pedido:</p> 

                        {order.bocadillos_order.map(bocadillo => (
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
                        ))}
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
                        <button
            type='button'
            className={`px-5 py-2 rounded text-white font-bold uppercase text-center w-full cursor-pointer 
                        ${order.estado === 'process' ? 'bg-indigo-600 hover:bg-indigo-800' : 'bg-green-600 hover:bg-green-800'}`}
            onClick={() => handleToggleOrderStatus(order.idOrder)}
        >
            {order.estado === 'process' ? 'En proceso' : 'Entregado'}
        </button>
                    </div>  
                ))}
            </div>
        </div>
    )
}
