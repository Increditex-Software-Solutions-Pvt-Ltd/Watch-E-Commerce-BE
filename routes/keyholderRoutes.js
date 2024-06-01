const express = require("express");
const keyholderRouter = express.Router();
const multer = require("multer");
const keyholderController = require("../controllers/keyholderController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/keyholder/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
keyholderRouter.post("/create", upload, keyholderController.createProduct);
keyholderRouter.put("/:id", upload, keyholderController.updateById);
keyholderRouter.delete("/:id", keyholderController.deleteById);
keyholderRouter.get("/getAllProducts", keyholderController.getAllProducts);

module.exports = keyholderRouter;
