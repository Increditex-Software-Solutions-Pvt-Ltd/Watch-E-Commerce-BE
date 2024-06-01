const NatoStrap = require("../models/NatoStrap");

const natoStrapController = {
  createProduct: async (req, res) => {
    try {
      const {
        modelName,
        modelNo,
        collectionName,
        description,
        brand,
        price,
        lugWidth,
        strapMaterial,
        strapColor,
        springBarType,
        buckleType,
        quantity,
      } = req.body;
      const images = req.files.map((file) => file.path); // Array of uploaded image paths

      const existingProduct = await NatoStrap.findOne({
        modelName,
        modelNo,
        collectionName,
        description,
        brand,
        price,
        lugWidth,
        strapMaterial,
        strapColor,
        springBarType,
        buckleType,
      });

      if (existingProduct) {
        // Product already exists, update its quantity by adding the provided quantity
        const previousQuantity = existingProduct.quantity;
        existingProduct.quantity += parseInt(quantity);
        await existingProduct.save();
        return res.status(200).json({
          "Previous Qnty": previousQuantity,
          "Updated Qnty": existingProduct.quantity,
          "Product Updated": existingProduct,
        });
      } else {
        const newProduct = new NatoStrap({
          modelName,
          modelNo,
          collectionName,
          description,
          images,
          brand,
          price,
          lugWidth,
          strapMaterial,
          strapColor,
          springBarType,
          buckleType,
          quantity,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ "Product Created": savedProduct });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await NatoStrap.find();
      const totalQuantity = products.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      // Send success response with the products data
      res.status(200).json({
        "Total Products": products.length,
        "Total Quantity": totalQuantity,
        products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateById: async (req, res) => {
    try {
      const productId = req.params.id;

      // Fetch the product by ID from the database
      const product = await NatoStrap.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update the product with new data from req.body
      const updates = req.body;
      Object.keys(updates).forEach((key) => {
        product[key] = updates[key];
      });

      // If new images are uploaded, add them to the product's images array
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => file.path);
        product.images = newImages;
      }

      // Save the updated product
      const updatedProduct = await product.save();

      // Send success response with the updated product data
      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error("Error updating products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteById: async (req, res) => {
    try {
      const productId = req.params.id;

      // Find and delete the product by ID
      const deletedProduct = await NatoStrap.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Send success response with the deleted product data
      res
        .status(200)
        .json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = natoStrapController;
