const UserService = require("../services/UserServices");

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Missing inputs",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Invalid email",
      });
    }
    const response = await UserService.createUser(name, email, password, phone);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message || error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Missing inputs",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Invalid email",
      });
    }
    const response = await UserService.loginUser(email,password);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
//   updateUser,
  // deleteUser,
  getProfile,
};
