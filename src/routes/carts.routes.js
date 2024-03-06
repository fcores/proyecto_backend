const { Router } = require('express');
const fs = require('fs').promises;
const ProductManager = require('../productManager');
const listaDeProductos = new ProductManager('./src/carrito.json');

const router = Router();

// GET / http://localhost:8080/api/carts?limit=3
router.get(`/`, async (req, res) => {
    try {
        const { limit } = req.query;
        const limitNumber = limit ? parseInt(limit, 10) : undefined;
        const carts = await listaDeProductos.getCarts();

        if (limitNumber) {
            return res.status(200).json({
                carts: carts.productos.slice(0, limitNumber)
            });
        } else {
            return res.status(200).json({
                carts: carts.productos
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// GET / http://localhost:8080/api/carts/4
router.get(`/:cid`, async (req, res) => {
    try {
        const { cid } = req.params;
        const cartId = cid ? parseInt(cid, 10) : undefined;
        const cartById = await listaDeProductos.getProductsById(cartId);

        if (cartById === 'Not found') {
            return res.status(400).json({
                error: 'Cart not found'
            });
        } else {
            return res.status(200).json({
                cart: cartById
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// POST http://localhost:8080/api/carts
router.post(`/`, async (req, res) => {
    const result = await listaDeProductos.addCart();
    if (result === -1) {
        res.json({
            ok: true,
            message: `Carrito no creado`,
            product: `Estás intentando crear un carrito ya registrado`
        });
    } else {
        res.json({
            ok: true,
            message: `Carrito creado`,
            product: result
        });
    }
});

// POST http://localhost:8080/api/carts/:cid/product/:pid
router.post(`/:cid/product/:pid`, async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = req.body;
        const cartId = cid ? parseInt(cid, 10) : undefined;
        const productId = pid ? parseInt(pid, 10) : undefined;
        const quantity = product.quantity || 1;

        
        const updatedCart = await listaDeProductos.addProductToCart(cartId, productId, quantity);

        if (updatedCart === 'Cart not found' || updatedCart === 'Not found') {
            return res.status(400).json({
                error: 'Cart or product not found'
            });
        } else {
            return res.status(200).json({
                cart: updatedCart
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
