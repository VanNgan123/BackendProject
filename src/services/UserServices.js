const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genneralAccessToken } = require("./JwtServices");
const createUser = async (name, email, password, phone) => {
  try {
    if (!password) {
      throw new Error("Password is required");
    }
    const checkUser = await User.findOne({ email: email });

    if (checkUser) throw new Error("Email already exist");

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    return {
      status: "OK",
      message: "User created successfully",
      data: createdUser,
    };
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not already");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new Error("wrong password");
    const access_token = genneralAccessToken({
      id: user.id,
      isAdmin: user.role,
    });
    // const refresh_token = genneralRefreshToken({
    //   id: checkUser.id,
    //   isAdmin: checkUser.isAdmin
    // })
    return {access_token };
  } catch (error) {
    console.log("🚀 ~ loginUser ~ error:", error);
  }
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password_hash");
  if (!user) throw new Error("User không tồn tại");
  return user;
};



module.exports = {
  createUser,
  loginUser,
  // deleteUser,
  getUserById,
};
