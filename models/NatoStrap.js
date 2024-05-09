const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const natoStrapSchema = new Schema({
  modelName: {
    type: String,
    required: true,
  },
  modelNo: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0,
  },
  lugWidth: {
    type: String,
    required: true,
  },
  strapMaterial: {
    type: String,
    required: true,
  },
  strapColor: {
    type: String,
    required: true,
  },
  springBarType: {
    type: String,
    required: true,
  },
  buckleType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update 'updatedAt' field before saving
natoStrapSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

natoStrapSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.productId = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("NatoStrap", natoStrapSchema);
