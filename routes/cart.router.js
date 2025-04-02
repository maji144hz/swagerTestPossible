const express = require("express");
const router = express.Router();
const {getAllCarts, createCart, getCartsByUserName, deleteAllCarts, updateCartById, deleteCartById, createCartWithBarcode} = require("../controllers/cart.controller");

// #swagger.tags = ['Cart']
router.post("/", createCart);

// #swagger.tags = ['Cart']
router.post("/add-with-barcode", createCartWithBarcode);

// #swagger.tags = ['Cart']
router.get("/", getAllCarts);

// #swagger.tags = ['Cart']
router.get("/:userName", getCartsByUserName);

// #swagger.tags = ['Cart']
router.put("/:id", updateCartById);

// #swagger.tags = ['Cart']
router.delete("/deleteAllCarts/:userName", deleteAllCarts);

// #swagger.tags = ['Cart']
router.delete("/:id", deleteCartById);

module.exports = router;
