const express = require("express");
const cufflinksRouter = express.Router();
const multer = require("multer");
const cufflinksController = require("../controllers/cufflinksController");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cufflinks/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
cufflinksRouter.post("/create", upload, cufflinksController.createProduct);
cufflinksRouter.put("/:id", upload, cufflinksController.updateById);
cufflinksRouter.delete("/:id", cufflinksController.deleteById);
cufflinksRouter.get("/getAllProducts", cufflinksController.getAllProducts);

module.exports = cufflinksRouter;
