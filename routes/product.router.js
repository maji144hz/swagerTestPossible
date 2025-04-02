const express = require("express");
const router = express.Router();
const {createProduct, getAllProducts, getProductByBarcode, getProductById, updateProductById, deleteProductById} = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

// #swagger.tags = ['Product']
// #swagger.description = 'Create a new product'
router.post("/", upload.single("productImage"), createProduct);

// #swagger.tags = ['Product']
// #swagger.description = 'Get all products'
router.get("/", getAllProducts);

// #swagger.tags = ['Product']
// #swagger.description = 'Get product by ID'
router.get("/:id", getProductById);

// #swagger.tags = ['Product']
// #swagger.description = 'Get product by barcode'
router.get("/barcode/:barcode", getProductByBarcode);

// #swagger.tags = ['Product']
// #swagger.description = 'Update product by ID'
router.put("/:id", upload.single("productImage"), updateProductById);

// #swagger.tags = ['Product']
// #swagger.description = 'Delete product by ID'
router.delete("/:id", deleteProductById);

module.exports = router;
