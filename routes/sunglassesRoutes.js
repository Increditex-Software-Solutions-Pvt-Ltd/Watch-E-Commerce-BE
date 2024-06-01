const express = require("express");
const sunglassesRouter = express.Router();
const multer = require("multer");
const sunglassesController = require("../controllers/sunglassesController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/sunglasses/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
sunglassesRouter.post("/create", upload, sunglassesController.createProduct);
sunglassesRouter.put("/:id", upload, sunglassesController.updateById);
sunglassesRouter.delete("/:id", sunglassesController.deleteById);
sunglassesRouter.get("/getAllProducts", sunglassesController.getAllProducts);

module.exports = sunglassesRouter;
