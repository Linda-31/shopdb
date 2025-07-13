const express = require("express");
const Product = require("../Modules/productmodule");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST - Add new product
router.post("/add", async (req, res) => {
    try {
         console.log("🟡 Incoming product data:", req.body);
        const {
            productName,
            brandName,
            category,
            price,
            color,
            size,
            image,
            description,
        } = req.body;

        const newProduct = new Product({
            productName,
            brandName,
            category,
            price,
            color,
            size,
            image,
            description,
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT - Update product by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "❌ Product not found" });
        }

        res.status(200).json({ message: "✅ Product updated", product: updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
