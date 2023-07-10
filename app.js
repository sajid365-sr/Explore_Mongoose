/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// schema design
mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    unique: [true, "Name must be unique."],
    minLength: [3, "name must be at least 3 characters long."],
    maxLength: [100, "name must be at most 100 characters long."],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be negative."],
  },
  unit: {
    type: String,
    required: true,
    enum: {
      value: ["kg", "litre", "pcs"],
      message: "unit value can't be {}, value must be kg/litre/pcs",
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative."],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if (isInteger) {
          return true;
        } else {
          return false;
        }
      },
    },
    message: "Quantity must be an integer.",
  },
  status: {
    type: String,
    required: true,
    enum: {
      value: ["in-stock", "out-of-stock", "discontinued"],
      message: "Status can't be {VALUE}",
    },
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // }
  suppplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  categories: [{
    name: {
      type: String,
      required: true,
    },
    _id: mongoose.Schema.Types.ObjectId,
  }],
  timestamps: true,
});

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
