import  {Outlet} from 'react-router-dom';

import Sidebar from '../components/sidebar';
import Resumen from '../components/resumen';

export default function layout() {
  return (
    <div className='md:flex'>
        <Sidebar />
        
        
        <Outlet />

        <Resumen />


    </div>
  )
}
