const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var path = require("path");
var logger = require("morgan");
require("dotenv").config();

const usersRouter = require("./routes/user.js");
const sellersRoutes = require("./routes/seller");
const productsRoures = require("./routes/product.js");
const ordersRoures = require("./routes/order");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET POST PATCH PUT DELETE",
  })
);

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

app.use("/user", usersRouter);
app.use("/sellers", sellersRoutes);
app.use("/products", productsRoures);
app.use("/orders", ordersRoures);

app.use("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.listen(8000, () => {
  console.log("Back to bussiness");
});
