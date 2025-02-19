const vendorController = require("../controllers/vendorcontroller");
const express = require("express");
const router = express.Router();
// import { VendorRegistration } from "../controllers/vendorcontroller.js";
console.log(vendorController);
router.post("/register", vendorController.VendorRegistration);
router.post("/login", vendorController.vendorLogin);

module.exports = router;
