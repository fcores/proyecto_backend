//INICIALIZAR SERVIDOR
const express = require('express')
const app = express()
//VARIABLES GLOBALES
const API_BASE_PATH = "api"
const PORT = 8080
//DEFINICION DE MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(express.json()) // middleware global
//ROUTES
const productsRoute = require('../src/routes/products.routes.js')
const cartsRoute = require('./routes/carts.routes.js')



//PRODUCTS
app.use(`/${API_BASE_PATH}/products`,productsRoute)
//CARTS
app.use(`/${API_BASE_PATH}/carts`,cartsRoute)


app.listen(PORT,()=> {
    console.log(`API RUNNING, PORT: ${PORT}`);
})




