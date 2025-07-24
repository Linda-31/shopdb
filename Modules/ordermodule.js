const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String, unique: true, required: true,},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', },
            quantity: { type: Number, required: true, min: 1, },
            // size: {type: String,required: true,},
            color: { type: String, required: true, },
            totalPrice: {
                type: Number, required: true,
            }
        }
    ],
    platformFee: { type: Number, default: 5, },
    totalAmount: { type: Number, required: true, },
    createdAt: { type: Date, default: Date.now, }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);