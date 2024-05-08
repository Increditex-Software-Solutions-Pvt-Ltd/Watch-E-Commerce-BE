const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

// create an express app
const app = express();
app.use(cors());
app.use(express.json());

// set the strictQuery to false, so that it will disable the strict mode for the query filters
// mongoose will not throw any error when we use an undefined field in the query (ignored)
mongoose.set("strictQuery", false);

console.log("connecting to MongoDB");

// to connect to the database
mongoose
  .connect(config.MONGO_URL)
  .then((result) => {
    console.log("Connected to MongoDB Database");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// root end point: prints Welcome sms as an HTML
app.get("/", (request, response) => {
  response.send(
    `<h1><center><b><i>Welcome to E-commerce Backend App!</i></b></center></h1>`
  );
});

app.use("/users", userRouter);
app.use("/products", productRouter);

// Listen to the PORT for requests
app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});

module.exports = app;
