const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/CategoryController")

router.post("/", categoryController.create);
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.put("/:id", categoryController.update);

module.exports = router;