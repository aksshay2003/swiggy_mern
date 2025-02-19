const vendor = require("../models/Vendor.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.secret_key;
const verifyToken = async (req, res,next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "token is required" });
  }
  //we need to encode the decoded token bt id in vendorControler
  try {
    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);
    const findVendor = await vendor.findById(decoded.vendorId);
    //we extracted vendorr id from vendor db using token
    if (!findVendor) {
      return res.status(404).json({ error: "vendor not found" });
    }
    req.vendorId = findVendor._id;
    next(); //next is used to continue to next
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

module.exports = verifyToken;
