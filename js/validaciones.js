//Validacion del campo del Precio del Formulario Agregar Producto

const inputPrecio = document.querySelector(".Precio");

inputPrecio.addEventListener("input", (event) => {
    // Remueve cualquier caracter no numérico
    let valor = event.target.value.replace(/\D/g, "");

    // Aplica el formato de moneda sin decimales
    valor = new Intl.NumberFormat("es-CO", { // Cambia "es-CO" al código de tu país si es necesario
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);

    // Actualiza el valor del input con el formato aplicado
    event.target.value = valor;
});