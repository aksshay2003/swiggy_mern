const mongoose = require("mongoose");
const Vendor = require("../models/Vendor.js");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.secret_key;

const VendorRegistration = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log("Password:", password);

  // console.log("Full Request:", req);
  console.log("Request body:", req.body);

  try {
    // Check if the user already exists
    const userindb = await Vendor.findOne({ email });
    if (userindb) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hashing the password
    const hashedpass = await bcryptjs.hash(password, 10);

    // Creating new vendor instance
    const newVendor = new Vendor({
      username,
      email,
      password: hashedpass,
    });

    // Saving vendor to the database
    await newVendor.save();

    // Returning success response
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during vendor registration:", error);

    // Returning error response
    return res.status(500).json({ message: "Internal server error" });
  }
};
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendoremail = await Vendor.findOne({ email });
    if (!vendoremail) {
      res.status(404).json({ error: "invalid user" });
    }
    const token = jsonwebtoken.sign({ vendorId: vendoremail._id }, secret_key, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: "login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = { VendorRegistration, vendorLogin };
