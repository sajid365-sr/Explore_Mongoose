/** @format */

const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
  updateProductService,
} = require("../services/product.services");

exports.createProduct = async (req, res) => {
  try {
    // instance creation => Do something => save()
    // const product = new Product(req.body);
    // const result = await product.save();

    // another method
    const result = await createProductService(req.body);
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
};

exports.getProduct = async (req, res, next) => {
  try {
    // Basic difference bitween mongodb and mongoose on query. You can query your data by query builder.

    // const products = await Product
    //   .where("name").equals(/\w/)
    //   .where("quantity").gt(90)
    //   .limit(2).sort({quantity: -1})

    const products = await getProductsService();

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
};

exports.updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await updateProductService(id, req.body.price);
    res.status(200).send({
      status: "success",
      message: "successfully update the data",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "can't update the product",
      error: e.message,
    });
  }
};
