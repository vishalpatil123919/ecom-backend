const express = require("express");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productcontroller");
const { isAuth, isAdmin } = require("../middlewares/authmiddlewares");

const productRoutes = express.Router();

productRoutes.get("/products", isAuth, getAllProduct);

productRoutes.get("/products/:id", getProductById);

productRoutes.post("/products", createProduct);
productRoutes.put("/products/:id", updateProduct);
productRoutes.delete("/products/:id", deleteProduct);

productRoutes.post("/products", isAuth, isAdmin, createProduct);
productRoutes.put("/products/:id", isAuth, isAdmin, updateProduct);
productRoutes.delete("/products/:id", isAuth, isAdmin, deleteProduct);

module.exports = productRoutes;
