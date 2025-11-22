const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = await User.findById(decoded.id).select("-password_hash");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Không xác thực, token sai" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Không xác thực, không có token" });
  }
};

const Admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Chỉ Admin mới thực hiện được" });
  }
};

module.exports = {
  authMiddleware,
  Admin
};
