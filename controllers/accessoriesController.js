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
          collectionName: "NatoStrap",
          logo: natoStrapProducts[0].images[0],
          "Total Products": natoStrapProducts.length,
          "Total Quantity": totalQuantityNatoStraps,
        },
        {
          name: "Two Piece Straps",
          collectionName: "TwoPieceStrap",
          logo: twoPieceStrapProducts[0].images[0],
          "Total Products": twoPieceStrapProducts.length,
          "Total Quantity": totalQuantityTwoPieceStraps,
        },
        {
          name: "Fine Leather",
          collectionName: "FineLeather",
          logo: fineLeatherProducts[0].images[0],
          "Total Products": fineLeatherProducts.length,
          "Total Quantity": totalQuantityFineLeather,
        },
        {
          name: "Bracelets",
          collectionName: "Bracelet",
          logo: braceletsProducts[0].images[0],
          "Total Products": braceletsProducts.length,
          "Total Quantity": totalQuantityBracelets,
        },
        {
          name: "Cufflinks",
          collectionName: "Cufflinks",
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
        (await NatoStrap.findById(productId)) ||
        (await TwoPieceStrap.findById(productId)) ||
        (await FineLeather.findById(productId)) ||
        (await Bracelet.findById(productId)) ||
        (await Cufflinks.findById(productId));
      if (!accessory) {
        return res.status(404).json({ message: "Accessory not found" });
      }
      res.status(200).json({ product: accessory });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getListByCollection: async (req, res) => {
    try {
      const name = req.params.name;
      let collectionList;

      if (name === "NatoStrap") {
        collectionList = await NatoStrap.find();
      } else if (name === "TwoPieceStrap") {
        collectionList = await TwoPieceStrap.find();
      } else if (name === "Bracelet") {
        collectionList = await Bracelet.find();
      } else if (name === "FineLeather") {
        collectionList = await FineLeather.find();
      } else {
        collectionList = await Cufflinks.find();
      }
      const totalQuantity = collectionList.reduce(
        (acc, cur) => acc + cur.quantity,
        0
      );
      if (!collectionList) {
        return res.status(404).json({ message: "List not found" });
      }
      res.status(200).json({
        "Total Products": collectionList.length,
        "Total Quantity": totalQuantity,
        Products: collectionList,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = accessoriesController;
