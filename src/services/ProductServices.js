const slugify = require("slugify");
const Product = require("../models/Product");
const Category = require("../models/Category");

const createProduct = async (data, imageUrls) => {
  const { name, price, categories, specs, stock, salePrice, brand } = data;

  if (!name || !price) throw new Error("Name or price is required");

  const slug = slugify(name, { lower: true, strict: true });

  const checkProduct = await Product.findOne({ slug });
  if (checkProduct) throw new Error("Product already exists");

  const parsedCategories = categories
    ? Array.isArray(categories)
      ? categories
      : JSON.parse(categories)
    : [];

  if (parsedCategories.length > 0) {
    const found = await Category.find({ _id: { $in: parsedCategories } });
    if (found.length !== parsedCategories.length)
      throw new Error("Some category IDs do not exist");
  }

  const product = await Product.create({
    name,
    slug,
    price,
    salePrice: salePrice || null,
    brand: brand || null,
    categories: parsedCategories,
    specs: specs ? JSON.parse(specs) : {},
    stock: stock || 0,
    image: imageUrls || [],
  });

  return product;
};

const getAllProduct = async () => {
  try {
    const products = await Product.find().populate("categories", "name slug");
    return products;
  } catch (error) {
    console.log("🚀 ~ getAllProducts ~ error:", error.message);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate(
      "categories",
      "name slug"
    );
    return product;
  } catch (error) {
    console.log("🚀 ~ getProductById ~ error:", error.message);
    throw error;
  }
};

// -------------------- UPDATE PRODUCT --------------------
const updateProduct = async (id, data, files) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  // Nếu có ảnh upload mới → thêm vào cuối mảng
  if (files && files.length > 0) {
    const newImages = files.map((file) => "/" + file.path);
    product.image.push(...newImages);
  }

  // Cập nhật field khác
  product.name = data.name || product.name;
  product.price = data.price || product.price;
  product.description = data.description || product.description;

  return await product.save();
};

// -------------------- DELETE PRODUCT IMAGE --------------------
const deleteProductImage = async (id, index) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  const img = product.image[index];
  if (!img) throw new Error("Image not found");

  // Xoá file vật lý trong uploads
  const filePath = path.join(".", img);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  // Xoá khỏi array
  product.image.splice(index, 1);

  return await product.save();
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  // Xoá tất cả file ảnh vật lý
  if (product.image && product.image.length > 0) {
    product.image.forEach((imgPath) => {
      const filePath = path.join(".", imgPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  // Xoá product khỏi DB
  await Product.findByIdAndDelete(id);
  return { message: "Product deleted successfully" };
};



module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProductImage,
  deleteProduct
};
