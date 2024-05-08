const Product = require("../models/Product");

const productController = {
  createProduct: async (req, res) => {
    try {
      const {
        modelName,
        modelNo,
        collectionName,
        description,
        brand,
        price,
        dialColor,
        dialSize,
        strapMaterial,
        strapColor,
        functions,
        movement,
        gender,
        quantity,
      } = req.body;
      const images = req.files.map((file) => file.path); // Array of uploaded image paths

      const existingProduct = await Product.findOne({
        modelName,
        modelNo,
        collectionName,
        description,
        brand,
        price,
        dialColor,
        dialSize,
        strapMaterial,
        strapColor,
        functions,
        movement,
        gender,
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
        const newProduct = new Product({
          modelName,
          modelNo,
          collectionName,
          description,
          images,
          brand,
          price,
          dialColor,
          dialSize,
          strapMaterial,
          strapColor,
          functions,
          movement,
          gender,
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
      const products = await Product.find();
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
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;

      // Fetch the watch by ID from the database
      const watch = await Product.findById(productId);

      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }

      // Send success response with the watch data
      res.status(200).json({ watch });
    } catch (error) {
      console.error("Error fetching watch:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getProductsByCollection: async (req, res) => {
    try {
      const collectionName = req.params.collectionName;

      // Fetch products with the same collection name from the database
      const products = await Product.find({ collectionName });
      const totalQuantity = products.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      // Send success response with the products data
      res.status(200).json({
        Collection: collectionName,
        "Total Products": products.length,
        "Total Quantity": totalQuantity,
        Products: products,
      });
    } catch (error) {
      console.error("Error fetching products by collection:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = productController;
