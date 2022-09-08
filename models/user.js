const mongoose = require("mongoose");
const schema = mongoose.Schema({
    userId: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['seller', 'buyer'],
    },
    name: { type: String, required: true },
    emailId: { type: String },
    mobileNo: { type: String },
    password: { type: String },
    token: { type: String },
    catalog: { type: String },
    address: {
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
        collection: "users",
        timestamps: true
    }
);

schema.index({
    userId: 1
}, {
    unique: true
});

module.exports = mongoose.model("Users", schema);