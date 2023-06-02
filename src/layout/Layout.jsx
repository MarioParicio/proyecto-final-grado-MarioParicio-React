import  {Outlet} from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogin from '../hooks/useLogin';
import ModalProducto from '../components/ModalProducto';

import useBocateria from "../hooks/useBocateria";


import Sidebar from '../components/sidebar';
import Resumen from '../components/resumen';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//Modal.setAppElement("#root");
export default function Layout() {

  const {modal, handleClickModal} = useBocateria()

  return (
    <>
    <div className='md:flex'>
        <Sidebar />
  
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3  scrollbar-hide'>
        <Outlet />
        </main>
        
        
       

        <Resumen />


    </div>
   (
      <Modal isOpen={modal} style={customStyles} >

            <ModalProducto />
       
      </Modal>
      <ToastContainer/>

      )
        
        </>
  )
}
