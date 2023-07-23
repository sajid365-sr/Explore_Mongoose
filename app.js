/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const Product = require("./schema/product");

app.use(express.json());
app.use(cors());

/* ============================= SCHEMA => MODEL => QUERY ========================== */

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to db
app.post("/api/v1/product", async (req, res) => {
  try {
    // instance creation => Do something => save()
    const product = new Product(req.body);
    const result = await product.save();

    // another method
    // const result = await Product.create(req.body)
    result.testFunction();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfuly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
});

// Get the data
app.get("/api/v1/product", async (req, res, next) => {
  try {
    const products = await Product.find({},"-name -quantity");

    res.send({
      status: "success",
      message: "successfully got the data",
      data: products,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: e.message,
    });
  }
});

module.exports = app;
