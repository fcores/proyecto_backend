const express = require('express')
const app = express()
const API_BASE_PATH = "/api"
const PORT = 8080
const fs = require('fs').promises;
app.use(express.urlencoded({extended:true}))
app.use(express.json()) // middleware global
const ProductManager = require('./productManager.js');
const listaDeProductos = new ProductManager('./producto.json');


//http://localhost:8080/api/products?limit=3
app.get(`${API_BASE_PATH}/products`, async (req, res) => {
    try {
        const { limit } = req.query;
        const limitNumber = limit ? parseInt(limit, 10) : undefined;
        const products = await listaDeProductos.getProducts();

        if(limitNumber){
            return res.status(200).json({
                productos: products.productos.slice(0,limitNumber)
            });
        }else{
            return res.status(200).json({
                productos: products
            });
        }

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

//http://localhost:8080/api/products/4
app.get(`${API_BASE_PATH}/products/:pid`, async (req, res) => {
    try {
        const productid = req.params;
        const number = productid.pid ? parseInt(productid.pid, 10) : undefined;
        const productsbyid = await listaDeProductos.getProductsById(number)

        if(productid === -1){
            return res.status(400).json({
                error : 'Not found product'
            });
        }else{
            return res.status(200).json({
                productos: productsbyid
            });
        }

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


app.listen(PORT,()=> {
    console.log(`API RUNNING, PORT: ${PORT}`);
})