const express = require("express");
const controller = require("../controllers/firmController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const path = require("path");
const routes = express.Router();
routes.get("/uploads/:image", (req, res) => {
  const image = req.params.image;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

routes.post("/add-firm", verifyToken, controller.firmcontroller);
routes.delete("/del-firm/firmId", controller.deleteFirm);

module.exports = routes;
