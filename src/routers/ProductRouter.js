const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController")


router.post("/",productController.upload.array("images", 5), // max 5 file
  productController.createProduct);
router.get("/",productController.getAllProduct);
router.get("/:id",productController.getProductById);
router.put(
  "/:id",productController.upload.array("images", 5),
  productController.updateProduct
);
router.delete("/:id/image/:index", productController.deleteProductImage);

module.exports = router;
