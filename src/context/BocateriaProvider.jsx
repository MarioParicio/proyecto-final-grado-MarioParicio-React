import { createContext } from "react"

const BocateriaContext = createContext()


const BocateriaProvider = ({children}) => {

    return (
        <BocateriaContext.Provider
            value={{


               }}

        
        >{children}</BocateriaContext.Provider>
    )
}

export {
    BocateriaContext
}
export default BocateriaProvider