import { createContext, useState} from "react";
import { categorias as CategoriasBD } from "../data/categorias";
const BocateriaContext = createContext();

const BocateriaProvider = ({children}) => {
    const [categorias, setCategorias] = useState(CategoriasBD)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])
    const [modal, setModal] = useState(false)

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
        
    }
    const handleClickModal = () => {
        setModal(!modal)
    }


    console.log(categoriaActual)






    return (
        <BocateriaContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal

            }}
        >
        {children}    </BocateriaContext.Provider>

    )
}
export {
    BocateriaProvider
}
export default BocateriaContext;