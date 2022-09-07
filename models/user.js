const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['seller', 'buyer'],
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        emailId: { type: String },
        mobileNo: { type: String },
        password: { type: String },
        token: { type: String },
        address: {
            addressLine1: { type: String },
            addressLine2: { type: String },
            state: { type: String },
            city: { type: String },
            pincode: { type: Number }
        },
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true }
    },
    {
        collection: "users"
    }
);

schema.index({
    userId: 1
}, {
    unique: true
});

module.exports = mongoose.model("Users", schema);