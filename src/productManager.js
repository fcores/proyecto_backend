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


module.exports = ProductManager
