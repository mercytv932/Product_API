const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res
      .status(201)
      .json({ message: "The Product was successfully created 🟢" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create the product 🔴" });
  }
});
