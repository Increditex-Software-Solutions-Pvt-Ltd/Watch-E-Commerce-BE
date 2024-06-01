const express = require("express");
const beltRouter = express.Router();
const multer = require("multer");
const beltController = require("../controllers/beltController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/belts/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
beltRouter.post("/create", upload, beltController.createProduct);
beltRouter.put("/:id", upload, beltController.updateById);
beltRouter.delete("/:id", beltController.deleteById);
beltRouter.get("/getAllProducts", beltController.getAllProducts);

module.exports = beltRouter;
