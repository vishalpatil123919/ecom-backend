const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const productRoutes = require("./router/productRouter");
const authRoutes = require("./router/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/", productRoutes);

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URL)

  .then(() => {
    console.log("databse cannected");

    app.listen(3000, () => {
      console.log("server is running in 3000");
    });
  })
  .catch((error) => {
    console.log("error cannecting to the database:", error.message);
  });
