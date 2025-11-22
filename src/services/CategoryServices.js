const { default: slugify } = require("slugify");
const Category = require("../models/Category");

const createCategory = async ({name, parentId = null}) => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid category name");
  }
  const slug = slugify(name, { lower: true, strict: true });
  const checkSlug = await Category.findOne({ slug });
  if (checkSlug) throw new Error("Category is already");
  const category = await Category.create({
    name,
    slug,
    parentId: parentId || null,
  });
  return category;
};

// Lấy tất cả danh mục
const getAllCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Không tìm thấy danh mục.");
  return category;
};

const updateCategory = async (id, data) => {
  const { name, parentId } = data;

  const category = await Category.findById(id);
  if (!category) throw new Error("Không tìm thấy danh mục.");

  if (name) {
    const slug = slugify(name, { lower: true, strict: true });
    const checkSlug = await Category.findOne({ slug, _id: { $ne: id } });
    if (checkSlug) throw new Error("Slug đã tồn tại.");
    category.name = name;
    category.slug = slug;
  }

  if (parentId !== undefined) category.parentId = parentId || null;

  await category.save();
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  //   deleteCategory,
};
