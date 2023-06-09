import React from 'react'
import useBocateria from "../hooks/useBocateria";
import { LoginProvider } from '../context/LoginProvider';
import useLogin from '../hooks/useLogin';

export default function Usuarios() {

    const { toggleUserState, users } = useLogin();

    // Ordenar los usuarios por el último log
    const sortedUsers = [...users].sort((a, b) => {
        const aLastLogTime = a.logs && a.logs.length > 0 && a.logs[a.logs.length - 1]?.loginTime?.seconds;
        const bLastLogTime = b.logs && b.logs.length > 0 && b.logs[b.logs.length - 1]?.loginTime?.seconds;
    
        // Handle the case where one or both times are undefined
        if (aLastLogTime === undefined && bLastLogTime === undefined) return 0;
        if (aLastLogTime === undefined) return 1;
        if (bLastLogTime === undefined) return -1;
    
        return bLastLogTime - aLastLogTime;
    });
 
    return (
        <div>
            <h1 className='text-4xl font-bold'>Usuarios</h1>
            <p className='text-xl my-10'>Administra los usuarios desde aquí</p>
            <div className='grid grid-cols-2 gap-5'>
                {sortedUsers.map(user => (
                    <div key={user.id} className='p-5 bg-white shadow space-y-2 border-b '>
                        <p className='text-xl font-bold text-slate-600'>Información del Usuario:</p>
                        
                        <div className='border-b border-b-slate-200 last-of-type:border-none py-4'>
                            <p className='text-sm'>ID: {user.id}</p> 
                            <p className='text-sm'>Email: {user.email}</p>
                            <p className='font-bold'>Nombre: {user.name}</p>
                            <p>Role: {user.role}</p>
                            <p>Estado: {user.state}</p>
                        </div>

                        <p className='text-xl font-bold text-slate-600'>Último Log:</p>
                        {user.logs.length > 0 && (
                            <div className='border-b border-b-slate-200 last-of-type:border-none py-4'>
                               <p className='text-sm'>Login Time: {user.logs && user.logs.length > 0 && user.logs[user.logs.length - 1]?.loginTime ? new Date(user.logs[user.logs.length - 1].loginTime.seconds * 1000).toLocaleString() : "N/A"}</p>
                                <p className='text-sm'>Platform: {user.logs[user.logs.length - 1].platform}</p>
                            </div>
                        )}
                        <button
                        className={`px-5 py-2 rounded text-white font-bold uppercase text-center w-full cursor-pointer 
                        ${user.state === 'inactive' ? 'bg-indigo-600 hover:bg-indigo-800' : 'bg-green-600 hover:bg-green-800'}`}
                         onClick={() => toggleUserState(user.id, user.state === 'active' ? 'inactive' : 'active')}>
                          {user.state === 'active' ? 'Desactivar' : 'Activar'}
                            </button>
                    </div>
                ))}
            </div>
        </div>
    )
}