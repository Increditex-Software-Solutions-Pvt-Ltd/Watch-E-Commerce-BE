const express = require("express");
const braceletsRouter = express.Router();
const multer = require("multer");
const braceletController = require("../controllers/braceletsController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/bracelets/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
braceletsRouter.post("/create", upload, braceletController.createProduct);
braceletsRouter.put("/:id", upload, braceletController.updateById);
braceletsRouter.delete("/:id", braceletController.deleteById);
braceletsRouter.get("/getAllProducts", braceletController.getAllProducts);

module.exports = braceletsRouter;
