import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { categorias as CategoriasBD } from "../data/categorias";
import { firestore } from "../firebase";
import firebase from "@firebase/app-compat";
import { LoginProvider } from "./LoginProvider";
import useLogin from "../hooks/useLogin";

const BocateriaContext = createContext();

const BocateriaProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(CategoriasBD);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
  const [modal, setModal] = useState(false);
  const [bocadillo, setBocadillo] = useState({});
  const [bocadillos, setBocadillos] = useState([]);
  const [activeBocadillos, setActiveBocadillos] = useState([]); // bocadillos.filter(bocadillo => bocadillo.active === true)
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userSelectedFilter, setUserSelectedFilter] = useState("Todas");
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("");
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.dateOrder);
      return (
        (selectedFilter === "Hoy" ? orderDate.toDateString() === today.toDateString() : true) &&
        (selectedFilter === "Este mes" ? orderDate >= firstDayOfMonth : true) &&
        (selectedStatus === "Entregados" ? order.estado === "completed" : true) &&
        (selectedStatus === "En proceso" ? order.estado === "process" : true)
      );
    });






  const makeOrder = async () => {
    console.log(pedido);

    if (pedido.length === 0) {
      toast.error('No hay bocadillos en el pedido.');
      return;
    }
    
    try {
      let fechaActual = new Date();
      let fechaComoISO = fechaActual.toISOString();

      //Obtener usuario por uid
const userDocRef = firestore.collection("users").doc(firebase.auth().currentUser.uid);

//Obtener el documento del usuario
const userDoc = await userDocRef.get();

// Verificar si el documento existe
if (!userDoc.exists) {
  console.error('El documento del usuario no existe.');
  return;
}


// Obtener los datos del documento
const userData = userDoc.data();
const nota = userData.nota == null ? "" : userData.nota;
// Prepare new order data
const newOrder = {
         // Array of bocadillos in the order
        bocadillos_order : pedido.map((bocadillo) => ({
          bocadilloName: bocadillo.name,
          cantidad: bocadillo.cantidad,
          nota: nota,
          uid: bocadillo.id,
        })),
        //2023-05-27T14:39:56.348672
        dateOrder: fechaComoISO, 
        email: firebase.auth().currentUser.email,
        estado: "process",
        nameClient: userData.name, 
        idClient : firebase.auth().currentUser.uid,
        paid : false,
        total: total,
      




      };
      console.log(newOrder);
      
      // Save the new order to Firestore
      await firestore.collection('orders').doc(newOrder.idOrder).set(newOrder);
      
      // Update local orders state
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      
      // Reset the current order state
      setPedido([]);
      setTotal(0);

      toast.success('Pedido realizado con éxito.');
    } catch (error) {
      console.error('Error al realizar el pedido: ', error);
      toast.error('Error al realizar el pedido.');
    }
  };
  const fetchUserOrders = async () => {

    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
      const ordersCollection = firestore.collection("orders");
      const snapshot = await ordersCollection.where("idClient", "==", userId).get();
      //Map the document data to order by date

      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserOrders(ordersList);
    } else {
      console.error('No hay un usuario autenticado');
    }
  };

  const filteredUserOrders = userOrders.filter((order) => {
    const orderDate = new Date(order.dateOrder);
    return (
      (userSelectedFilter === "Hoy" ? orderDate.toDateString() === today.toDateString() : true) &&
      (userSelectedFilter === "Este mes" ? orderDate >= firstDayOfMonth : true)
    );
  });





  const handleToggleOrderStatus = async (idOrder) => {

    console.log(idOrder);
    const orderDocRef = firestore.collection("orders").doc(idOrder);

    const orderDoc = await orderDocRef.get();

    if (!orderDoc.exists) {
      toast.error("No se encontraron pedidos coincidentes.");
      console.log("No se encontraron pedidos coincidentes.");
      return;
    }


    const orderData = orderDoc.data();
    const newStatus = orderData.estado === "process" ? "completed" : "process";

    if (pedido.idOrder === idOrder) {
      setPedido({...pedido,estado: newStatus});
    }
    await orderDocRef.update({
      estado: newStatus,
    });

    const updatedOrders = orders.map((order) =>
      order.idOrder === idOrder ? { ...order, estado: newStatus } : order
    );
    setOrders(updatedOrders);
    toast.success(`El pedido ${idOrder} ha sido actualizado.`);
  };

  const fetchBocadillos = async () => {
    const bocadillosCollection = firestore.collection("bocadillos");
    const snapshot = await bocadillosCollection.get();
    const bocadillosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBocadillos(bocadillosList);

    // Aquí actualizamos activeBocadillos después de haber actualizado bocadillos
    setActiveBocadillos(bocadillosList.filter(bocadillo => bocadillo.active));
  };

  const fetchUsers = async () => {
    const usersCollection = firestore.collection("users");
    const snapshot = await usersCollection.get();
    const usersList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  };
  const fetchFilteredOrders= () =>{
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.dateOrder);
      return (
        (selectedFilter === "Hoy" ? orderDate.toDateString() === today.toDateString() : true) &&
        (selectedFilter === "Este mes" ? orderDate >= firstDayOfMonth : true) &&
        (selectedStatus === "Entregados" ? order.estado === "completed" : true) &&
        (selectedStatus === "En proceso" ? order.estado === "process" : true)
      );
    }
    );
  }

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id)[0];
    setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleSetBocadillo = (bocadillo) => {
    setBocadillo(bocadillo);
  };

  const handleAgregarPedido = ({ ...bocadillo }) => {
    if (pedido.some((pedidoState) => pedidoState.id === bocadillo.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === bocadillo.id ? bocadillo : pedidoState
      );
      setPedido(pedidoActualizado);
      toast.success("Bocadillo actualizado");
    } else {
      setPedido([...pedido, bocadillo]);
      toast.success("Bocadillo agregado al pedido");
    }
  };

  const handleEditarCantidad = (id) => {
    const bocadilloActualizar = pedido.find((pedidoState) => pedidoState.id === id);
    setBocadillo(bocadilloActualizar);
    setModal(!modal);
  };

  const handleEliminarBocadillo = (uid) => {
    
    const pedidoEliminar = pedido.filter((pedidoState) => pedidoState.id !== uid);
    setPedido(pedidoEliminar);
    toast.success("Bocadillo eliminado del pedido");
  };
  const toggleBocadilloStatus = async (bocadilloId) => {
    const bocadilloDocRef = firestore.collection("bocadillos").doc(bocadilloId);
    const bocadilloDoc = await bocadilloDocRef.get();
    
    if (!bocadilloDoc.exists) {
      toast.error("Bocadillo not found.");
      console.log("Bocadillo not found.");
      return;
    }

    const bocadilloData = bocadilloDoc.data();
    const newStatus = !bocadilloData.active;

    await bocadilloDocRef.update({
      active: newStatus,
    });


    const updatedBocadillos = bocadillos.map((bocadillo) =>
      bocadillo.id === bocadilloId ? { ...bocadillo, active: newStatus } : bocadillo
    );

    setBocadillos(updatedBocadillos);
    setActiveBocadillos(updatedBocadillos.filter(bocadillo => bocadillo.active));
    toast.success(`Bocadillo ${bocadilloId} status has been updated.`);
  };
  useEffect(() => {
    const nuevoTotal = pedido.reduce((acumulador, bocadillo) => acumulador + bocadillo.price * bocadillo.cantidad, 0);
    setTotal(nuevoTotal);
  }, [pedido]);

// Inside the BocateriaProvider component
const fetchOrders = async () => {
  const ordersCollection = firestore.collection("orders").orderBy("dateOrder", "desc");
  const snapshot = await ordersCollection.get();
  const ordersList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setOrders(ordersList);
};

useEffect(() => {
  fetchOrders();

  setTimeout(() => {
    fetchUserOrders();
  }, 3000);
}, [ users]);

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
        bocadillo,
        handleSetBocadillo,
        pedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarBocadillo,
        total,
        orders,
        bocadillos,
        users,
        handleToggleOrderStatus,
        selectedFilter,
        filteredOrders,
        setSelectedFilter,
        selectedStatus,
        setSelectedStatus,
        activeBocadillos,
        toggleBocadilloStatus,
        makeOrder,
        fetchUserOrders,

        userOrders,
        filteredUserOrders,
        userSelectedFilter,
        setUserSelectedFilter,

     
        


        
        
      }}
    >
      {children}
    </BocateriaContext.Provider>
  );
};

export { BocateriaProvider };
export default BocateriaContext;
