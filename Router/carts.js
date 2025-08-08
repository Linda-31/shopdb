const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cart = require('../Modules/cartmodule');

router.post('/save', async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId || !cartItems) {
    return res.status(400).json({ error: 'Missing userId or cartItems' });
  }

  const formattedProducts = cartItems.map(item => ({
    product: item._id,
    // title: item.title,
    // price: item.price,
    quantity: item.quantity || 1,
    color: item.color,
    size: item.size || (Array.isArray(item.sizes) ? item.sizes[0] : undefined),
    totalPrice: 8999//item.price * (item.quantity || 1),
  }));

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart = await Cart.findByIdAndUpdate(cart._id, {
        products: formattedProducts
      }, { new: true });

    } else {
      cart = new Cart({ user: userId, products: formattedProducts });
      await cart.save();
    }
    
    cart = await Cart.findById(cart._id).populate('products.product', 'title price image');

    res.status(200).json({ message: 'Cart saved successfully', cart });

  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

router.get('/cart/:id', async (req, res) => {
  try {
    const user = req.params.id;
    console.log("Received request for userId:", user);

    if (!user) {
      return res.status(400).json({ message: "Missing userId in query" });
    }
    const userObjectId = new mongoose.Types.ObjectId(user);
    const cart = await Cart.find({ user: userObjectId }).populate('products.product');
    console.log("Cart fetched from DB:", cart.products);  //no products

    if (!cart) {
      console.log("No cart found for user:", user);
      return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: cart.products  });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
