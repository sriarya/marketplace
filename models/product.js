const mongoose = require("mongoose");

const schema = mongoose.schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sellerId: { type: String, required: true },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'INR', 'SGD', 'MYR'],
    },
    catalog: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
},
    {
        collection: "products"
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