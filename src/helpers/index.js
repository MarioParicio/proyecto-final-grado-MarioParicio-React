import Modal from 'react-modal';
Modal.setAppElement('#root');
export const formatearDinero = cantidad=> {
    if (cantidad !== undefined && cantidad !== null) 
    return cantidad.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
    else return "";
}


   
        
