const mongoose = require("mongoose");

const schema = mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: { type: String, required: true },
    currency: {
        type: String,
        required: true,
        default: "INR",
        enum: ["USD", "INR", "SGD", "MYR"],
    },
    catalog: { type: String, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
},
    {
        collection: "products",
        timestamps: true
    }
)

schema.index({
    productId: 1,
    sellerId: 1,
    catalog: 1
}, {
    unique: true
});

module.exports = mongoose.model("Products", schema);