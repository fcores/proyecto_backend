const { Router } = require('express');
const fs = require('fs').promises;
const ProductManager = require('../dao/productManager.js');
const productModel = require('../dao/models/producto.model.js');
const productData = require('../data/producto.js')
const listaDeProductos = new ProductManager('./src/producto.json');
const router = Router();
const ProductManagerMongo = require('../dao/product.manager.js')

// GET / http://localhost:8080/api/products?limit=3
router.get(`/v1`, async (req, res) => {
    try {
        const { limit } = req.query;
        const limitNumber = limit ? parseInt(limit, 10) : undefined;
        const products = await listaDeProductos.getProducts();

        if (limitNumber) {
            return res.status(200).json({
                productos: products.productos.slice(0, limitNumber)
            });
        } else {
            return res.status(200).json({
                productos: products.productos
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// GET / http://localhost:8080/api/products/4
router.get(`/v1/:pid`, async (req, res) => {
    try {
        const productid = req.params;
        const number = productid.pid ? parseInt(productid.pid, 10) : undefined;
        const productsbyid = await listaDeProductos.getProductsById(number);

        if (productsbyid === 'Not found') {
            return res.status(400).json({
                error: 'Not found product'
            });
        } else {
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

// POST http://localhost:8080/api/products ======== OK
router.post(`/v1`, async (req, res) => {
    const producto = req.body;
    const result = await listaDeProductos.addProduct(producto);

    if (result === -1) {
        res.json({
            ok: true,
            message: `Producto no creado`,
            product: `Estás intentando ingresar un producto ya registrado`
        });
    } else {
        res.json({
            ok: true,
            message: `Producto creado`,
            product: result
        });
    }
});

// PUT http://localhost:8080/api/products/4 ========== OK
router.put(`/v1/:pid`, async (req, res) => {
    try {
        const productid = req.params;
        const producto = req.body;
        const number = productid.pid ? parseInt(productid.pid, 10) : undefined;
        const productsbyid = await listaDeProductos.updateProduct(number, producto);

        if (productsbyid === 'Product not found') {
            return res.status(400).json({
                error: 'Not found product'
            });
        } else {
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

// DELETE http://localhost:8080/api/products/4 ======== OK
router.delete(`/v1/:pid`, async (req, res) => {
    try {
        const productid = req.params;
        const number = productid.pid ? parseInt(productid.pid, 10) : undefined;
        const productsbyid = await listaDeProductos.deleteProduct(number);

        if (productsbyid === 'Not found') {
            return res.status(400).json({
                error: 'Not found product'
            });
        } else {
            return res.status(200).json({
                ok: true,
                message: `Producto con ${number} borrado`
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

//================================================//
//==================METODOS CON MONGO=============//

//REGISTRAR TODOS LOS PRODUCTOS
router.get("/v2/insertion", async (req, res) => {  
    try{
        let result = await productModel.insertMany(productData);
        return res.json({
            message: "Todos los productos ingresados correctamente",
            result,
        });
    }catch(error){
        console.log(error)
    }
});


//DEVOLVER TODOS LOS PRODUCTOS
router.get(`/v2`, async (req, res) => {
    try {
    
        const productManager  = new ProductManagerMongo()
        const products = await productManager.getAllProducts();
    
        return res
            .status(200)
            .json({ ok: true, message: `getAllProducts`, products });

    } catch (error) {

        console.log(error);
    }
});

// RETORNAR UNO DE LOS PRODUCTOS
router.get(`/v2/:sid`, async (req, res) => {
    try {
      const productId = req.params.sid;
      const productManager  = new ProductManagerMongo()
      const product = await productManager.getProductById(productId);

      if (!product) {
        return res.status(404).json({
          ok: true,
          message: `El producto no existe`,
        });
      }

      return res
        .status(200)
        .json({ ok: true, message: `getProductsById`, product });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        message: `something WRONG!!!`,
        error: error.message,
      });
    }
});

//CREAR UN PRODUCTO
router.post(`/v2`, async (req, res) => {
    try {
      // TODO: HACER VALIDACIONES DEL BODY
      const productBody = req.body;

      // TODO REVISANDO SI EL PRODUCTO YA FUE CREADO 
      const productManager = new ProductManagerMongo()
      const newProduct = await productManager.createProduct(productBody);

    if (!newProduct) {
        return res.status(400).json({
            error: `El codigo de producto ${productBody.code} ya se encuentra registrado`,
        });
    }

      return res.json({
        message: `Producto Creado correctamente`,
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ ok: false, message: error.message });
    }
});

module.exports = router;