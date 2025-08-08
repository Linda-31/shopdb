const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', },
            // title: { type: String},
            //  price: { type: Number},
            quantity: { type: Number, required: true, min: 1, },
            color: { type: String, },
            size: { type: String, },
            totalPrice: { type: Number, },
        }
    ],

    updatedAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartItemSchema);
