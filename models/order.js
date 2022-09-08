const mongoose = require("mongoose");

const schema = mongoose.Schema({
    //parentOrderId: { type: String, required: true },
    //childOrderId: { type: String, required: true },
    orderId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            name: { type: String },
            price: { type: String },
            quantity: { type: String },
            currency: { type: String }
        }
    ],
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    status: {
        type: String,
        required: true,
        default: "confirmed",
        enum: [
            'confirmed',
            'shipped',
            'delivered',
            'cancelled',
            'returned'
        ]
    },
    totalOrderValue: { type: Number, required: true },
    currency: {
        type: String,
        required: true,
        default: "INR",
        enum: ["USD", "INR", "SGD", "MYR"],
    },
    history: { type: Object },
    paymentRefrenceId: { type: String },
    shippingAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        state: { type: String },
        city: { type: String },
        pincode: { type: Number }
    },
    createdAt: { type: Date },
    updatedAt: { type: Date }
},
    {
        collection: "orders",
        timestamps: true
    }
)

schema.index({ orderId: 1 }, { unique: true });
schema.index({ sellerId: 1 });
schema.index({ buyerId: 1 });

module.exports = mongoose.model("Orders", schema);