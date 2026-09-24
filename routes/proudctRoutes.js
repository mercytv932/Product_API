const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "The Product was successfully created 🟢",
      Product: savedProduct,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to create the product 🔴" });
  }
});
