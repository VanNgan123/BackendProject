const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { authMiddleware, Admin } = require("../middleware/authMiddlware");
// User
router.post("/", orderController.createOrder);
router.get("/user/:userId", orderController.getOrdersByUser);
router.post("/from-cart", orderController.createOrderFromCart);
// Admin
router.get("/",authMiddleware,Admin, orderController.getAllOrders);
router.put("/:id",authMiddleware,Admin, orderController.updateOrderStatus);
router.delete("/:id",authMiddleware,Admin, orderController.deleteOrder);

module.exports = router;
