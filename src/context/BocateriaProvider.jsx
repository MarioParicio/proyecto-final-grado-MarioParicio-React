import { createContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { categorias as CategoriasBD } from "../data/categorias";
const BocateriaContext = createContext();

const BocateriaProvider = ({children}) => {
    const [categorias, setCategorias] = useState(CategoriasBD)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
        
    }
    const handleClickModal = () => {
        setModal(!modal)
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleAgregarPedido = ({categoria_id,  ...producto}) => {

        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Producto actualizado')
           
        }else{
                setPedido([...pedido, producto])
                toast.success('Producto agregado al pedido')
        }
    }
    const handleEditarCantidad = id => {
        const pedidoActualizar =  pedido.find(pedidoState => pedidoState.id === id)
        setProducto(pedidoActualizar)
        setModal(!modal)
    }
    const handleEliminarProducto = id => {
        const pedidoEliminar = pedido.filter(pedidoState => pedidoState.id !== id)
        setPedido(pedidoEliminar)
        toast.success('Producto eliminado del pedido')
    }
    useEffect(() => {
        const nuevoTotal = pedido.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    return (
        <BocateriaContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProducto,
                total
            }}
        >
        {children}    </BocateriaContext.Provider>

    )
}
export {
    BocateriaProvider
}
export default BocateriaContext;