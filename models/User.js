const mongoose = require("mongoose");
const schema = mongoose.Schema;

// schema
const userSchema = new schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validate phone number format
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: false,
  },
  address: {
    type: String,
    required:false,
  },
  password: {
    type: String,
    required: true,
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
userSchema.pre("save", function (next) {
  this.updatedAt = new Date().now;
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.userId = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
