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
    title: item.title,
    price: item.price,
    quantity: item.quantity || 1,
    color: item.color,
    size: item.size || (Array.isArray(item.sizes) ? item.sizes[0] : undefined),
    totalPrice: item.price * (item.quantity || 1),
  }));

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.products = formattedProducts;
    } else {
      cart = new Cart({ user: userId, products: formattedProducts });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate('products.product', 'title price');

    res.status(200).json({ message: 'Cart saved successfully', cart });
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});


// router.get('/:id', async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     res.json(cart ? cart.items : []);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to load cart' });
//   }
// });
router.get('/cart', async (req, res) => {
  const cart = await User.find();
       res.json(cart.products); 
  });
module.exports = router;
