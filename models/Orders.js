const mongoose = require("mongoose");
const schema = mongoose.Schema;

// schema
const orderSchema = new schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
    userId: String,
    notes: Object,
  },
  success: Boolean,
});

// Middleware to update 'updatedAt' field before saving
orderSchema.pre("save", function (next) {
  this.updatedAt = new Date().now;
  next();
});

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.orderId = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Order", orderSchema);
