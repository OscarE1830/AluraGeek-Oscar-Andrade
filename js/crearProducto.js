import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");

// Validaciones y creación de producto

async function crearProducto(evento) {
    evento.preventDefault();
    const imagen = document.querySelector("[data-imagen]").value.trim();
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value.trim();

        window.location.href="../pages/registro-ok.html"

    try {
        await conectaAPI.crearProducto(nombre, precio, imagen);

    } catch (error) {
        console.error('Error al crear el producto:', error);
        // Mostrar alerta de error
        Swal.fire({
            title: 'Error',
            text: `Hubo un error: ${ error.message}. Intenta de nuevo.`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } 
}

formulario.addEventListener("submit", evento=>crearProducto(evento));