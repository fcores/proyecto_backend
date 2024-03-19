const mongoose = require("mongoose");

const collectionName = "products";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: true,
    unique: true //ME AUTOGENERA EL ID
  },
  curso: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
  },
  category: {
    type: String,
    required: true,
    enum:['gamer','escritorio']
  },
});

const productModel = mongoose.model(collectionName, productSchema);

module.exports = productModel;