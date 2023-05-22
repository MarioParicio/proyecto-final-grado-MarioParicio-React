import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom'
import { BocateriaProvider } from './context/BocateriaProvider'
import { LoginProvider } from './context/LoginProvider'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import router from './assets/router'
import Login from './views/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BocateriaProvider>
      <LoginProvider>
          <RouterProvider 
          router={router}
          />
          <ToastContainer />
          
      </LoginProvider>
          
      </BocateriaProvider>
  </React.StrictMode>,
)