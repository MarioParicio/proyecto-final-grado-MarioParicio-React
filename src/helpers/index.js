export const formatearDinero = cantidad=> {
    return cantidad.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2
    });
        
}
    