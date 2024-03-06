const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const allProducts = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(allProducts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const { title, description, price, thumbnail, code, stock } = product;
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.code === code);

      if (productIndex === -1) {
        const lastId =
        allProducts.productos.length === 0
            ? 1
            : allProducts.productos[allProducts.productos.length - 1].id + 1;

        const newProduct = { id: lastId, ...product };
        allProducts.productos.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(allProducts));
        
        return allProducts;
      } else {
        console.log('Estás ingresando un producto con un código repetido');
        return

      }

    } catch (error) {
      console.log(error);
      throw error
    }
  }


  async updateProduct(id,updatedProduct) {
    try {

      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);

      if (productIndex === -1) {
        return 'Product not found';
      }

      allProducts.productos[productIndex] = { ...allProducts.productos[productIndex], ...updatedProduct };
      await fs.writeFile(this.path, JSON.stringify(allProducts));
        
      return allProducts;

      }catch (error) {
      console.log(error);
      throw error
    }
  }
  
  async deleteProduct(id) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);
      
      if (productIndex === -1) {
        return 'Not found';
      }
      
      allProducts.productos.splice(productIndex, 1);

      await fs.writeFile(this.path, JSON.stringify(allProducts));

    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para manejarlo externamente si es necesario
    }
  }

  async getProductsById(id) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);
      
      if (productIndex === -1) {
        return 'Not found';
      }
      
      return allProducts.productos[productIndex];

    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para manejarlo externamente si es necesario
    }
  }
}

// Creo una instancia de la clase “ProductManager”
const listaDeProductos = new ProductManager('producto.json');


// Genero la funcion Prueba
async function prueba() {
  try {
    // 1) Llamar a "getProducts" recién creada la instancia, debe devolver un arreglo vacío []
    console.log(await listaDeProductos.getProducts());

    // 2) Llama al método “addProduct” con un ejemplo
    await listaDeProductos.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin Imagen',
      code: 'abc1243443532',
      stock: 25
    });

    // 3) Llama al método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    console.log(await listaDeProductos.getProducts());


    // 4) Llama al método "getProductsById" para evaluar que devuelva el producto o un mensaje de error
    console.log('El producto con id 2 es: ', await listaDeProductos.getProductsById(2));

    // 5) Llama al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
    await listaDeProductos.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin Imagen',
      code: 'abc1243443532',
      stock: 25
    });

    // 6) Actualizar un producto con el metodo "updateProduct"
    console.log(await listaDeProductos.updateProduct(2, {
        title: 'Nuevo título',
        description: 'Nueva descripción2',
        price: 300,
        thumbnail: 'Nueva Imagen',
        code: 'abc456',
        stock: 50
      }));
    // Verifica que el producto haya sido actualizado
    console.log(await listaDeProductos.getProducts());
  

    // 7) Eliminar con el  método "deleteProduct" un producto en particular por su id
    await listaDeProductos.deleteProduct(3)

  } catch (error) {
    console.error('Error en la prueba asincrónica:', error);
  }
}

// Ejecuta la prueba asincrónica
prueba()
