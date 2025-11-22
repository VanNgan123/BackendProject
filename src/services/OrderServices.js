const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (data) => {
  const { userId, items, shippingAddress, paymentMethod } = data;

  if (!userId || !items || items.length === 0) {
    throw new Error("Thiếu thông tin đơn hàng hoặc danh sách sản phẩm.");
  }

  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Không tìm thấy sản phẩm ID: ${item.productId}`);
    total += product.price * item.qty;
  }
  const order = await Order.create({
    userId,
    items,
    shippingAddress,
    paymentMethod,
    total,
  });

  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("items.productId", "name price");
  return orders;
};

const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ userId })
    .populate("items.productId", "name price");
  return orders;
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  if (!order) throw new Error("Không tìm thấy đơn hàng.");
  return order;
};

const deleteOrder = async (orderId) => {
  const order = await Order.findByIdAndDelete(orderId);
  if (!order) throw new Error("Không tìm thấy đơn hàng để xóa.");
  return order;
};



const createOrderFromCart = async (userId, shippingAddress, paymentMethod = "COD") => {
  const cart = await cartService.getCartByUser(userId);
  if (!cart || cart.items.length === 0) throw new Error("Giỏ hàng trống.");

  let total = 0;
  for (const item of cart.items) {
    total += item.productId.price * item.qty;
  }
  const order = await Order.create({
    userId,
    items: cart.items.map((item) => ({
      productId: item.productId._id,
      qty: item.qty,
      price: item.productId.price,
    })),
    shippingAddress,
    paymentMethod,
    total,
    status: "Pending",
  });

  await cartService.clearCart(userId);

  return order;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
  createOrderFromCart
};
