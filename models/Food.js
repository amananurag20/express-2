const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },

    description: {
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
        type: String,
        enum: ["Appetizer", "Main Course", "Dessert", "Beverage", "Other"],
        default: "Other"
    },
    isAvailable: {
        type: Boolean,
        default: true
    },


}, {
    timestamps: true
});

const foodModel= mongoose.model("Food",foodSchema);

module.exports=foodModel;