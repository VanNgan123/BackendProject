const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/CategoryController")
const { authMiddleware, Admin } = require("../middleware/authMiddlware");

router.post("/",authMiddleware,Admin, categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.put("/:id",authMiddleware,Admin, categoryController.update);

module.exports = router;