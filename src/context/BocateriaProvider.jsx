import { createContext, useState} from "react";
import { categorias as CategoriasBD } from "../data/categorias";
const BocateriaContext = createContext();

const BocateriaProvider = ({children}) => {
    const [categorias, setCategorias] = useState(CategoriasBD)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
        
    }


    console.log(categoriaActual)






    return (
        <BocateriaContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria

            }}
        >
        {children}    </BocateriaContext.Provider>

    )
}
export {
    BocateriaProvider
}
export default BocateriaContext;