const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleware } = require("../middleware/authMiddlware");

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
// router.put('/update-user/:id',userController.updateUser)
// router.delete('/delete-user/:id',authMiddleware,admin ,userController.deleteUser)
router.get("/profile", authMiddleware, userController.getProfile);
module.exports = router;