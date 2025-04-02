const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById, deleteOrder, updateOrderDetail} = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderDetail);
router.delete("/:id", deleteOrder);

module.exports = router;