const Product = require("../models/productModel");
const Firm = require("../models/firmModel");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    // console.log(req.body);
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      res.status(404).json({ message: "firm not found" });
    }
    //product
    const product = new Product({
      productName,
      price,
      category,
      image,
      bestseller,
      description,
      firm: firm._id,
    });
    const savedProd = await product.save();
    //destination of the product is to be there in firm(rest)  as there can be multiple products in a single firm
    firm.products.push(savedProd);
    await firm.save();
    res.status(200).json({ message: savedProd });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    //firm to check if firm exists
    const firm = await Firm.findById(firmId);
    if (!firm) {
      res.status(404).json({ message: "prod not found" });
    }
    const prod = await Product.find({ firm: firmId });
    const firmName = firm.firmName;
    res.status(200).json({ firmName, prod });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteProd = async (req, res) => {
  try {
    const id = req.params.prodId;
    const prod = await Product.findByIdAndDelete(id);
    if (!prod) {
      res.status(404).json({ message: prod });
    }
    res.status(200).json({ message: "deleted product", prod });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deleteProd,
};
