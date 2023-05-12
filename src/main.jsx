import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {BocateriaProvider} from './context/BocateriaProvider'
import './index.css'
import router from './assets/router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BocateriaProvider>
          <RouterProvider router={router}/>
      </BocateriaProvider>
  </React.StrictMode>,
)
