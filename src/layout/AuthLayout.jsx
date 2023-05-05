import { Outlet } from "react-router-dom"

export default function authLayout() {
    return (
      <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
        <img src='../../public/img/iconoQueFlipas.png' alt='image logotipo' className="max-w-xl"/>
        <div className=" p-10 w-full">
        <Outlet />
        </div>
      </main>
    )
  }
  