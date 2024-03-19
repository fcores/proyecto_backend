// Importa la biblioteca de Socket.io en el cliente
const socket = io();

const message = document.getElementById('productos')

socket.on('productos1', (data) => {
    // Verifica si data.productos es un array antes de iterar sobre él
    if (Array.isArray(data.productos)) {
        // Itera sobre la lista de productos
        let logs = ''
        data.productos.forEach(producto => {
            // Haz algo con cada producto, por ejemplo, imprímelo en la consola
            console.log(producto.id);
            logs += `<p>ID: ${producto.id}, Producto: ${producto.description}, Precio: ${producto.price}</p>`
        });
       message.innerHTML = logs
    } else {
        console.error('La propiedad productos no es un array');
    }
});