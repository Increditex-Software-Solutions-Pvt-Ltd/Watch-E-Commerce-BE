const express = require("express");
const twoPieceStrapRouter = express.Router();
const multer = require("multer");
const twoPieceStrapController = require("../controllers/twopieceStrapController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/twopiecestrap/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
twoPieceStrapRouter.post(
  "/create",
  upload,
  twoPieceStrapController.createProduct
);
twoPieceStrapRouter.put("/:id", upload, twoPieceStrapController.updateById);
twoPieceStrapRouter.delete("/:id", twoPieceStrapController.deleteById);
twoPieceStrapRouter.get(
  "/getAllProducts",
  twoPieceStrapController.getAllProducts
);

module.exports = twoPieceStrapRouter;
