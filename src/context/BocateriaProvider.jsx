import { createContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { categorias as CategoriasBD } from "../data/categorias";
import { firestore } from "../firebase";
import firebase from "@firebase/app-compat";
const BocateriaContext = createContext();

const BocateriaProvider = ({children}) => {
    const [categorias, setCategorias] = useState(CategoriasBD)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)
    const [orders, setOrders] = useState([])
    const [bocadillos, setBocadillos] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("Hoy")

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.dateOrder);
        switch (selectedFilter) {
            case "Hoy":
                return orderDate.toDateString() === today.toDateString();
            case "Este mes":
                return orderDate >= firstDayOfMonth;
            case "Todas":
            default:
                return true;
        }
    });

    const handleToggleOrderStatus = async (idOrder) => {
        console.log(idOrder);
        const orderDocRef = firestore.collection('orders').doc(idOrder);
        
        const orderDoc = await orderDocRef.get();
    
        if (!orderDoc.exists) {
            toast.error("No matching orders found.");
            console.log("No matching orders found.");
            return;
        }
    
        const orderData = orderDoc.data();
        const newStatus = orderData.estado === 'process' ? 'completed' : 'process';
    
        await orderDocRef.update({
            estado: newStatus
        });
    
        const updatedOrders = orders.map(order => 
            order.idOrder === idOrder ? { ...order, estado: newStatus } : order
        );
        setOrders(updatedOrders);
        toast.success(`Order ${idOrder} has been updated.`);
    }
    
    const fetchBocadillos = async () => {
        const bocadillosCollection = firestore.collection('bocadillos');
        const snapshot = await bocadillosCollection.get();
        const bocadillosList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setBocadillos(bocadillosList);
    };
    const fetchUsers = async () => {
        const usersCollection = firestore.collection('users');
        const snapshot = await usersCollection.get();
        const usersList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(usersList);
    };
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

    useEffect(() => {
        const fetchOrders = async () => {
          const ordersCollection = firestore.collection('orders');
          const snapshot = await ordersCollection.get();
          const ordersList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersList);
        };
        
        fetchOrders();
      }, []);

      useEffect(() => {
        fetchBocadillos();
        fetchUsers();
    }, []);

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
                total,
                orders,
                bocadillos, 
                users,
                handleToggleOrderStatus,
                selectedFilter,
                filteredOrders,
                setSelectedFilter
            }}
        >
        {children}    </BocateriaContext.Provider>

    )
}
export {
    BocateriaProvider
}
export default BocateriaContext;