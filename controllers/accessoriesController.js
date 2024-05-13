const Bracelet = require("../models/Bracelet");
const Cufflinks = require("../models/Cufflinks");
const FineLeather = require("../models/FineLeather");
const NatoStrap = require("../models/NatoStrap");
const TwoPieceStrap = require("../models/TwoPieceStrap");

const accessoriesController = {
  getList: async (req, res) => {
    try {
      // Fetch all Nato Straps from the database
      const natoStrapProducts = await NatoStrap.find();
      const totalQuantityNatoStraps = natoStrapProducts.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      // Send success response with the products data
      res.status(200).json({
        natoStraps: {
          name: "Nato Straps",
          logo: natoStrapProducts[0].images[0],
          "Total Products": natoStrapProducts.length,
          "Total Quantity": totalQuantityNatoStraps,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getById: async (req, res) => {
    try {
      const productId = req.params.id;
      const accessory =
        NatoStrap.findOne(productId) ||
        TwoPieceStrap.findOne(productId) ||
        FineLeather.findOne(productId) ||
        Bracelet.findOne(productId) ||
        Cufflinks.findOne(productId);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = accessoriesController;
