const productModel = require("../dao/models/producto.model");

class ProductManagerMongo {
  getAllProducts = async () => {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.find({ _id: id });

      return product;
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (bodyProduct) => {
    try {
      // TODO REVISANDO SI EL PRODUCTO YA FUE CREADO
      const productDetail = await productModel.findOne({
        dni: bodyProduct.code,
      });
      console.log(
        "🚀 ~ file: students.manager.js:35 ~ ProductManager ~ createProduct= ~ productDetail:",
        productDetail
      );

      if (productDetail && Object.keys(productDetail).length !== 0) {
        return null;
      }

      const newProduct = await productModel.create(bodyProduct);
      // TODO: Manejar el error o si pasa algo mientras creo el documento de estudiante

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ProductManagerMongo;