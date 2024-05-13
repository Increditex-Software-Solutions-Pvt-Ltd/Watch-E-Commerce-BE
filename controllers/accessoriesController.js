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
      const twoPieceStrapProducts = await TwoPieceStrap.find();
      const totalQuantityTwoPieceStraps = twoPieceStrapProducts.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      const fineLeatherProducts = await FineLeather.find();
      const totalQuantityFineLeather = fineLeatherProducts.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      const braceletsProducts = await Bracelet.find();
      const totalQuantityBracelets = braceletsProducts.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      const cufflinksProducts = await Cufflinks.find();
      const totalQuantityCufflinks = cufflinksProducts.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );

      // Send success response with the products data
      res.status(200).json([
        {
          name: "Nato Straps",
          logo: natoStrapProducts[0].images[0],
          "Total Products": natoStrapProducts.length,
          "Total Quantity": totalQuantityNatoStraps,
        },
        {
          name: "Two Piece Straps",
          logo: twoPieceStrapProducts[0].images[0],
          "Total Products": twoPieceStrapProducts.length,
          "Total Quantity": totalQuantityTwoPieceStraps,
        },
        {
          name: "Fine Leather",
          logo: fineLeatherProducts[0].images[0],
          "Total Products": fineLeatherProducts.length,
          "Total Quantity": totalQuantityFineLeather,
        },
        {
          name: "Bracelets",
          logo: braceletsProducts[0].images[0],
          "Total Products": braceletsProducts.length,
          "Total Quantity": totalQuantityBracelets,
        },
        {
          name: "Cufflinks",
          logo: cufflinksProducts[0].images[0],
          "Total Products": cufflinksProducts.length,
          "Total Quantity": totalQuantityCufflinks,
        },
      ]);
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

      res.status(200).json({ product: accessory });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = accessoriesController;
