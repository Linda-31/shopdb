const express = require("express");
const Product = require("../Modules/productmodule");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/add", async (req, res) => {
    try {
        
        const {
            title,
            brandName,
            category,
            price,
            color,
            size,
            image,
            description,
        } = req.body;

        const newProduct = new Product({
            title,
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
