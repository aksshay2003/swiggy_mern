const vendormodel = require("../models/Vendor");
const firm = require("../models/firmModel");
// firm=restaurant
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
const firmcontroller = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    //image is coming seperately
    const image = req.file ? req.file.filename : undefined;
    const vendor = await vendormodel.findById(req.vendorId); //u are using req.vendorId...from verifyToken(middleware) without importing(ingested in routes)
    console.log(vendor);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }
    //instance
    console.log("hi");
    const firms = new firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    console.log(firms);
    const userfirm = await firms.save(); //it takes time so we use await
    vendor.firm.push(userfirm); //pushing firm into vendor
    await vendor.save();
    return res.status(200).json({ message: "firm confirmed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Firm creation failed" });
  }
};

const deleteFirm = async (req, res) => {
  try {
    const id = req.params.firmId;
    const firm = await Product.findByIdAndDelete(id);
    if (!firm) {
      res.status(404).json({ message: firm });
    }
    res.status(200).json({ message: "deleted firm", firm });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

// module.exports = { firmcontroller: [upload.single("image"), firmcontroller] };
module.exports = {firmcontroller,deleteFirm};
