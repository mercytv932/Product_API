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

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ message: "Product Successfully deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

//Get all products
router.get("/", async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;
    const filter = {};
    const sort = {};
    const skip = (page - 1) * limit;
    if (category) {
      filter.category = category;
    }

    if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    if (sortBy) {
      if (sortBy === "price_asc") {
        sort.price = 1;
      } else if (sortBy === "price_desc") {
        sort.price = -1;
      }
    }
    const getAllProducts = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.json(getAllProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all products" });
  }
});

module.exports = router;
