const Product = require("../models/Product");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await Product.create(productData);

    res.status(201).json({
      message: "Product Create",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product updated",
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(20 + 4).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product deleted",
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
