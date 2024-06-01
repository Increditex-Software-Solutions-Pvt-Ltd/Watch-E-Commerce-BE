const express = require("express");
const natoStrapRouter = express.Router();
const natoStrapController = require("../controllers/natoStrapController");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/natostrap/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
natoStrapRouter.post("/create", upload, natoStrapController.createProduct);
natoStrapRouter.put("/:id", upload, natoStrapController.updateById);
natoStrapRouter.delete("/:id", natoStrapController.deleteById);
natoStrapRouter.get("/getAllProducts", natoStrapController.getAllProducts);

module.exports = natoStrapRouter;
