const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/productManager'); // Ruta correcta hacia ProductManager

// Ruta para renderizar la página principal
router.get('/', async (req, res) => {
  try {
      // Obtener la lista de productos desde el ProductManager u otra fuente de datos
      const productManager = new ProductManager('./src/producto.json');
      const productos = await productManager.getProducts();
      console.log(productos);
      // Renderizar la vista que muestra los productos y pasar los productos como datos
      res.render('index', { productos });
  } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {})
})



module.exports = router;
