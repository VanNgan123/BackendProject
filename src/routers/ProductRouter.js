const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController")
const { authMiddleware, Admin } = require("../middleware/authMiddlware");

router.post("/",authMiddleware,Admin ,productController.upload.array("images", 5), // max 5 file
  productController.createProduct);
router.get("/",productController.getAllProduct);
router.get("/:id",productController.getProductById);
router.put(
  "/:id",authMiddleware,Admin ,productController.upload.array("images", 5),
  productController.updateProduct
);
router.delete("/:id/image/:index",authMiddleware,Admin,productController.deleteProductImage);

module.exports = router;
