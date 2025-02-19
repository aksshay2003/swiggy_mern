const express = require("express");
const app = express(); //express nundi oche variables anni app ki assign chesam
const mongoose = require("mongoose");
const vendor = require("./models/Vendor.js");
const path = require("path");
const port = process.env.PORT || 7000; //for render.com(deployment)  CI=GIT AND CD=render
const dotenv = require("dotenv");
//routes
const vendorRoutes = require("./routes/routes");
const firmroutes = require("./routes/firmroutes");
const productRoutes = require("./routes/productRoutes.js");
// const bodyparser = require("body-parser");
//connecting mongo_uri in env
app.use(express.json());
//error comes if we dont write this
// app.use(express.urlencoded({ extended: true }));

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mdb connected"))
  .catch((error) => console.log(error));

//to convert the input data from body to json we use body-parser
//to create a http request
app.use("/vendor", vendorRoutes);
app.use("/firm", firmroutes);
app.use("/product", productRoutes);
app.get("/getvendors", async (req, res) => {
  try {
    const users = await vendor.find().populate("firm");
    console.log(users);
    res.status(200).json({ message: "students are", users });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "error", err });
  }
});
app.use("uploads", express.static("uploads"));
app.listen(port, () => {
  console.log(`running at port ${port}`);
});
app.get("/getuserbyId/:id", async (req, res) => {
  const userid = await req.params.id;
  try {
    const get = await vendor.findById(userid).populate("firm");
    if (!get) {
      res.status(404).json({ message: "user not found" });
    }
    console.log(get);
    res.status(200).json({ message: get });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

//then is for sucess and catch error
//router
app.use("/", (req, res) => {
  res.send("<h1>iam server");
});
