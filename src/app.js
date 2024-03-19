//INICIALIZAR SERVIDOR
const express = require('express')
const app = express()

//INICIALIZAR LIBRERIAS
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path'); // Importa el módulo 'path'
const mongoose = require('mongoose')
const displayRoutes = require('express-routemap');

//VARIABLES GLOBALES
const API_BASE_PATH = "api"
const PORT = 8080

//DEFINICION DE MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(express.json()) // middleware global

//ROUTES
const productsRoute = require('../src/routes/products.routes.js')
const cartsRoute = require('./routes/carts.routes.js')
const viewsRouter = require("./routes/views.router.js")
const ProductManager = require('./dao/productManager.js'); // Ruta correcta hacia ProductManager

//MONGO
const connection = mongoose.connect(`mongodb+srv://facundocores:1ip7AvHTxJsxP9rP@cluster0.mnai0ex.mongodb.net/ecommerce`).then((con => {
    console.log(`Conectado a la base de datos`)
})).catch((error)=>{
    console.log(`No conectado a la base de datos`,error)
})

//SOCKET
const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    displayRoutes(app)
})
const io = socketIo(httpServer);

//HANDLEBARS
app.engine("handlebars", exphbs.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//VISTAS ESTATICAS
app.use(express.static(path.join(__dirname, "/public")));
app.use("/", viewsRouter);


//PRODUCTS
app.use(`/${API_BASE_PATH}/products`,productsRoute)
//CARTS
app.use(`/${API_BASE_PATH}/carts`,cartsRoute)

// Configuración de Socket.io
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);
    
    // Envía la lista de productos cuando un cliente se conecta
    const productManager = new ProductManager('./src/producto.json');
    const productos = await productManager.getProducts();

    socket.emit('productos1',productos)

});
