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
};

module.exports = natoStrapController;