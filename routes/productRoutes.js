const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Use unique filename for uploaded images
  },
});

// Multer upload instance
const upload = multer({ storage: storage }).array("images", 5); // Allow uploading multiple images with the field name 'images'

// Route for handling image uploads and creating a new product
productRouter.post("/create", upload, productController.createProduct);

productRouter.get("/getAllproducts", productController.getAllProducts);

productRouter.get("/:id", productController.getProductById);

productRouter.put("/:id", upload, productController.updateProductById);

productRouter.delete("/:id", productController.deleteProductById);

productRouter.get(
  "/collection/:collectionName",
  productController.getProductsByCollection
);

module.exports = productRouter;
