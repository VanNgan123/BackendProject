const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addToCart);
router.get("/:userId", cartController.getCartByUser);
router.put("/:userId", cartController.updateCartItem);
router.delete("/:userId/:productId", cartController.removeFromCart);
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;