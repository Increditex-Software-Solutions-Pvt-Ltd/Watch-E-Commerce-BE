const express = require("express");
const accessoriesController = require("../controllers/accessoriesController");
const accessoriesRouter = express.Router();

// Route for handling image uploads and creating a new product
accessoriesRouter.get("/getList", accessoriesController.getList);
accessoriesRouter.get("/:id", accessoriesController.getById);
accessoriesRouter.get(
  "/collection/:name",
  accessoriesController.getListByCollection
);

module.exports = accessoriesRouter;
