import Modal from 'react-modal';
Modal.setAppElement('#root');
export const formatearDinero = cantidad=> {
    return cantidad.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
        
}
    