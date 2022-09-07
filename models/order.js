const mongoose = require("mongoose");

const schema = mongoose.schema({
    parentOrderId: { type: String, required: true },
    childOrderId: { type: String, required: true },
    quantity: { type: Number, required: true },
    productId: { type: String, required: true },
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: [
            'confirmed',
            'shipped',
            'delivered',
            'cancelled',
            'returned'
        ]
    },
    orderHistory: { type: Object },
    paymentRefrenceId: { type: String, required: true },
    shippingAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true }
    },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
},
    {
        collection: "orders"
    }
)

schema.index({
    childOrderId: 1,
    buyerId: 1,
    sellerId: 1
}, {
    unique: true
});

module.exports = mongoose.model("Orders", schema);