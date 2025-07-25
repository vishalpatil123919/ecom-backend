const express = require("express");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productcontroller");

const productRoutes = express.Router();

productRoutes.get("/products", getAllProduct);

productRoutes.get("/products/:id", getProductById);

productRoutes.post("/products", createProduct);
productRoutes.put("/products/:id", updateProduct);
productRoutes.delete("/products/:id", deleteProduct);
module.exports = productRoutes;
