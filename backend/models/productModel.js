const mongoose = require("mongoose");
const { collection } = require("./firmModel");
const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
// productModel=model name
// products=collectionname(automatically pluralises)
// productSchema=instance
module.exports = Product;
