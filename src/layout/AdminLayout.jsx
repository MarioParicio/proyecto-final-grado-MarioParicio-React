import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import  {Outlet} from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className='md:flex'>
    <AdminSidebar />

    <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3 scrollbar-hide '>
    <Outlet />
    </main>
    
    
   

  


</div>
  )
}
