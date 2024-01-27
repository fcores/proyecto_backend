const { Router } = require('express');
const fs = require('fs').promises;
const ProductManager = require('../productManager');
const listaDeProductos = new ProductManager('./src/producto.json');
const router = Router();

// GET / http://localhost:8080/api/products?limit=3
router.get(`/`, async (req, res) => {
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
router.get(`/:pid`, async (req, res) => {
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

// POST http://localhost:8080/api/products
router.post(`/`, async (req, res) => {
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

// PUT http://localhost:8080/api/products/4
router.put(`/:pid`, async (req, res) => {
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

// DELETE http://localhost:8080/api/products/4
router.delete(`/:pid`, async (req, res) => {
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

module.exports = router;