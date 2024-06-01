const Razorpay = require("razorpay");
const { KEY_ID_RAZORPAY, SECRET_RAZORPAY } = require("../utils/config");
const crypto = require("crypto");
const Orders = require("../models/Orders");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: KEY_ID_RAZORPAY,
        key_secret: SECRET_RAZORPAY,
      });

      const options = req.body;
      const order = await razorpay.orders.create(options);

      if (!order) {
        return res.status(500).send({ message: "Server Error" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).send({ message: "Server Error", error });
    }
  },
  success: async (req, res) => {
    try {
      // getting the details back from our font-end
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        userId,
        notes,
      } = req.body;

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac("sha256", SECRET_RAZORPAY);

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature)
        return res.status(400).json({ msg: "Transaction not legit!" });

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      const newPayment = new Orders({
        razorpayDetails: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
          userId,
          notes,
        },
        success: true,
      });

      await newPayment.save();

      res.status(200).json({
        msg: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  },
  search: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const bookings = await Orders.find({});
      console.log(bookings[0].razorpayDetails.userId);
      const userBookings = bookings.filter(
        (booking) => booking.razorpayDetails.userId === id
      );
      res.status(201).send({ Bookings: userBookings });
    } catch (error) {
      res.status(401).send({ message: "Server Error" });
    }
  },
};

module.exports = orderController;
