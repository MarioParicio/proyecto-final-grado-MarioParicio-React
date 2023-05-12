import { createContext} from "react";

const BocateriaContext = createContext();

const BocateriaProvider = ({children}) => {
    const autenticado = true;

    return (
        <BocateriaContext.Provider
            value={{
                 autenticado 

            }}
        >
        {children}    </BocateriaContext.Provider>

    )
}
export {
    BocateriaProvider
}
export default BocateriaContext;