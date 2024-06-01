const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

// create order
orderRouter.post("/createOrder", orderController.createOrder);

// verify signature and do payment
orderRouter.post("/success", orderController.success);

orderRouter.get("/search/:id", orderController.search);

module.exports = orderRouter;
