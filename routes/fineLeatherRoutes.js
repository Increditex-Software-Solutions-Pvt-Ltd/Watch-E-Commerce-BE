const express = require("express");
const fineLeatherRouter = express.Router();
const multer = require("multer");
const fineLeatherController = require("../controllers/fineLeatherController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/fineleather/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
fineLeatherRouter.post("/create", upload, fineLeatherController.createProduct);
fineLeatherRouter.put("/:id", upload, fineLeatherController.updateById);
fineLeatherRouter.delete("/:id", fineLeatherController.deleteById);
fineLeatherRouter.get("/getAllProducts", fineLeatherController.getAllProducts);

module.exports = fineLeatherRouter;
