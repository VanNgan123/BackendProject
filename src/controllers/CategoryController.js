const categoryService = require("../services/CategoryServices");

// POST /api/categories
const create = async (req, res) => {
  try {
    console.log("🚀 ~ create ~ req.body:", req.body)
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/categories
const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/categories/:id
const getOne = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// PUT /api/categories/:id
const update = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  update,
};