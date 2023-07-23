/** @format */

const express = require("express");
const productController = require("../controllers/Product.controller");
const router = express.Router();

router
  .route("/")
  .get(productController.getProduct)
  .post(productController.createProduct);

router.route("/:id").patch(productController.updateProducts);

module.exports = router;
