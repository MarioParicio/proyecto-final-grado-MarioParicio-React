import useBocateria from "../hooks/useBocateria";
import { formatearDinero } from '../helpers';
import React, { useEffect, useState } from 'react';
import { format, isToday  } from 'date-fns';

export default function MisOrdenes() {

    const {filteredUserOrders, setUserSelectedFilter, userSelectedFilter} = useBocateria();
    const [sortedOrders, setSortedOrders] = useState([]);
    
    // Run this every time filteredUserOrders change
    useEffect(() => {
        const orders = [...filteredUserOrders];  // Copy the array to avoid modifying state directly
        orders.sort((a, b) => new Date(b.dateOrder) - new Date(a.dateOrder)); // Sort by date in descending order
        setSortedOrders(orders);
    }, [filteredUserOrders]);
    
    return (
        <div>
            <div className='m-5'>
                <h1 className='text-4xl  font-bold'>Mis pedidos</h1>
                <p className='text-xl my-10'>Aquí puedes ver todos los pedidos que has realizado</p>
                
                <select
                    className='p-2 border border-gray-200 rounded'
                    value={userSelectedFilter}
                    onChange={event => setUserSelectedFilter(event.target.value)}
                >
                    <option value="Hoy">Hoy</option>
                    <option value="Este mes">Este mes</option>
                    <option value="Todas">Todos</option>
                </select>
            </div>
            
            <div className='grid grid-cols-2 gap-5'>
                {sortedOrders.map(order => (
                    <div key={order.id} className='p-5 bg-white shadow space-y-2 border-b '>
                        <p className='text-xl font-bold text-slate-600'>Contenido del pedido:</p> 
                        
                        {order.bocadillos_order.map(bocadillo => {
                            const orderDate = new Date(order.dateOrder);
                            const formattedDate = isToday(orderDate) ? 
                                `Hoy a las ${format(orderDate, 'HH:mm')}` : 
                                format(orderDate, 'dd/MM/yyyy HH:mm');

                            return (
                                <div 
                                key={bocadillo.uid}
                                className='border-b  border-b-slate-200  last-of-type:border-nome  py-4'
                                >
                                    <p className='text-lg  '>Nombre: {bocadillo.bocadilloName}</p> 
                                    <p className='text-lg  '>Cantidad: {bocadillo.cantidad}</p>
                                    <p className='text-lg '>Fecha: {formattedDate}</p>
                                    <p className='text-lg  '>Nota: {bocadillo.nota}</p>
                                </div> 
                            )
                        })}

                        <p className='text-lg font-bold '>
                            Total: {''}
                            <span className='font-normal text-slate-600'>{formatearDinero( order.total)}</span>
                        </p>

                        <p
                            className={`px-5 py-2 rounded text-white font-bold uppercase text-center w-full 
                                        ${!order.paid ? 'bg-indigo-600 ' : 'bg-green-600'}`}
                        >
                            {order.paid ? 'Pagado en la app' : 'Pagar en mano'}
                        </p>
                    </div>  
                ))}
            </div>
        </div>
    )
}
