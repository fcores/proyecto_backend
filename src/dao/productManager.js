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
      const { code } = product;
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

        return newProduct;
      } else {
        return -1;
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);

      if (productIndex === -1) {
        return 'Product not found';
      }

      allProducts.productos[productIndex] = { ...allProducts.productos[productIndex], ...updatedProduct };
      await fs.writeFile(this.path, JSON.stringify(allProducts));

      return allProducts;

    } catch (error) {
      console.log(error);
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}

class CartManager extends ProductManager {
  async addCart() {
    try {
      const allProducts = await this.getProducts();

      const lastId =
        allProducts.productos.length === 0
          ? 1
          : allProducts.productos[allProducts.productos.length - 1].id + 1;

      const newCart = {
        id: lastId,
        products: []  
      };
      allProducts.productos.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(allProducts));

      return newCart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const allProducts = await this.getProducts();
      const cartIndex = allProducts.productos.findIndex((e) => e.id === cartId);

      if (cartIndex === -1) {
        return 'Cart not found';
      }

      const existingProduct = allProducts.productos[cartIndex].products.find(
        (product) => product.product === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        allProducts.productos[cartIndex].products.push({
          product: productId,
          quantity: quantity
        });
      }

      await fs.writeFile(this.path, JSON.stringify(allProducts));

      return allProducts.productos[cartIndex];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCarts() {
    try {
      const allProducts = await this.getProducts();
      return allProducts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ProductManager
module.exports = CartManager