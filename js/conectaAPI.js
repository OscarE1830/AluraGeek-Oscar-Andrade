async function listaProductos(){
    const conexion = await fetch("https://67257550c39fedae05b4cc31.mockapi.io/productos",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });
    
    const conexionConvertida = await conexion.json();
    /* console.log(conexion);
    console.log(conexionConvertida); */
    return conexionConvertida;
}

async function crearProducto(nombre,precio,imagen){ 
    const conexion= await fetch("https://67257550c39fedae05b4cc31.mockapi.io/productos?",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({
        nombre:nombre,
        precio:`${precio}`,
        imagen:imagen
    })
    })
    if(!conexion.ok){
        throw new Error("No fue posible registrar el producto");
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

async function buscarProducto(referencia){
    try{
        const conexion = await fetch(`https://67257550c39fedae05b4cc31.mockapi.io/productos?nombre_like=${referencia}`)
        if (!conexion.ok) throw new Error("Error al conectar con la API");

        const conexionConvertida = await conexion.json();
        //console.log("Datos obtenidos de la API:", conexionConvertida); // Ver datos obtenidos
        return conexionConvertida;

    } catch (error) {
        console.error("Error en la búsqueda del producto:", error);
        return []; // Retornar un array vacío en caso de error
    }
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`https://67257550c39fedae05b4cc31.mockapi.io/productos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!conexion.ok) {
            throw new Error(`Error eliminando el producto: ${conexion.status}`);
        }
        
        return 'Producto eliminado correctamente'; // Mensaje en caso de éxito
    } catch (error) {
        console.error('Error:', error); 
        alert('Hubo un error al eliminar el producto'); // Notificación al usuario
    }
}


export const conectaAPI={
    listaProductos,crearProducto,buscarProducto,eliminarProducto
}
