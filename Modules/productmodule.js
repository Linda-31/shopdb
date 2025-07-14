const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },
  brandName: { type: String, required: true },
  category: { type: String, required: true }, 
  description: { type: String, required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
