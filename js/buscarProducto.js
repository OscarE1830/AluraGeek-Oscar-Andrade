import { conectaAPI } from "./conectaAPI.js";
import construyeCard from "./mostrarProductos.js";

//validaciones

async function buscarProducto(evento) {
    evento.preventDefault();
    const datosDeBusqueda = document.querySelector("[data-busqueda]").value.toLowerCase();
    const listaDeBusqueda = document.querySelector("[data-lista]");

    // Obtiene todos los productos
    const productos = await conectaAPI.buscarProducto("");

    // Filtra los productos en el cliente
    const busqueda = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(datosDeBusqueda)
    );

    // Limpia la lista antes de mostrar los resultados
    listaDeBusqueda.replaceChildren();

    // Muestra los productos filtrados o un mensaje si no hay resultados
    if (busqueda.length === 0) {
        listaDeBusqueda.innerHTML = `<h2 class="mensaje__titulo">No encontramos productos para ese filtro</h2>`;
    } else {
        busqueda.forEach(elemento =>
            listaDeBusqueda.appendChild(construyeCard(elemento.nombre, elemento.precio, elemento.imagen, elemento.id))
        );
    }
}

const botonBusqueda=document.querySelector("[data-boton-busqueda]");

botonBusqueda.addEventListener("click",evento=>buscarProducto(evento));
