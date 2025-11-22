const productServices = require("../services/ProductServices");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

const upload = multer({ storage, fileFilter });


const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const product = await productServices.createProduct(req.body, imageUrls);

    res.status(201).json({
      message: "Add product success",
      product
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getAllProduct =async(req, res)=>{
    try {
        const product = await productServices.getAllProduct();
        res.status(200).json({
            message:"List all product",
            product

        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}
const getProductById = async(req,res)=>{
    try {
        
        const product = await productServices.getProductById(req.params.id);
        res.status(200).json({  
            message:"Get product by ID success",
            product
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

const updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(
      req.params.id,
      req.body,
      req.files
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const updated = await productService.deleteProductImage(
      req.params.id,
      req.params.index
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




module.exports ={
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProductImage,
    deleteProduct,
    upload
}