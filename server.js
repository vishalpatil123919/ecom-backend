const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const productRoutes = require("./router/productRouter");
const authRoutes = require("./router/authRoutes");
const cartRoutes = require("./router/cartRoutes");
const orderRoutes = require("./router/orderRoutes");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "server is runing",
  });
});

app.use("/", productRoutes);

app.use("/", cartRoutes);

app.use("/auth", authRoutes);

app.use("/orders", orderRoutes);

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
