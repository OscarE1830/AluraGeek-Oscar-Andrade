import { conectaAPI } from "./conectaAPI.js";

const lista = document.querySelector("[data-lista]");

//validaciones

export default function construyeCard(nombre, precio, imagen, id) {
    const producto = document.createElement("div");
    producto.className = "card";

    producto.setAttribute("data-id", id);

    producto.innerHTML = `
                        <img class="card_img-producto" src="${imagen}" alt="imagen de producto" />
                        <div class="card-container--info">
                        <p class="nombre-producto">${nombre}</p>
                        <div class="card-container--value">
                            <p>${precio} cop</p>
                            <img class="card_img-icono btn-eliminar" data-id="${id}" src="./assets/trash-icon.png" alt="icono de eliminar" />
                        </div>
                        </div>`
                        ;
            //     // Evento para eliminar producto
            const botonEliminar = producto.querySelector(".btn-eliminar");
            botonEliminar.addEventListener("click", async (evento) => {
                const idProducto = evento.target.getAttribute('data-id');
                
                // Confirmación antes de eliminar (opcional)
                const confirmar = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: `¿Quieres eliminar el producto: ${ nombre}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                });

                if (confirmar.isConfirmed) {
                    await Swal.fire({
                        title: '¡Eliminando Producto!',
                        icon:'info',
                        timer:1700,
                        showConfirmButton: false,
                    });

                    await conectaAPI.eliminarProducto(idProducto);  // Llama a la función para eliminar el producto del servidor

                    // Eliminar visualmente el producto del DOM si se eliminó correctamente
                    producto.remove();
                }
            });
    return producto;
}

async function listaProductos() {
    try{
        const listaAPI = await conectaAPI.listaProductos();
        listaAPI.forEach(element => lista
            .appendChild(construyeCard(element.nombre, element.precio, element.imagen, element.id)));
    }catch{
        lista.innerHTML=`<h2 class="mensaje__titulo">No fue posible cargar la lista de productos</h2>`;
    }
}

listaProductos();