const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      enum: ["non-veg", "veg"],
    },
  ],
  region: [
    {
      type: String,
      enum: ["south-indian", "north-indian", "chinese", "bakery"],
    },
  ],
  offer: {
    type: String,
  },
  // image: {
  //   type: String,
  // },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId, //creating relation with vendor model
      ref: "vendor",
    },
  ],
  products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
});

const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;
