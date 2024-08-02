const mongoose = require("mongoose");
const { Schema } = mongoose;

// Assuming Status and Roles enums are defined elsewhere and imported
const { Status } = require("../utils/common/enums/status");
const { Roles } = require("../utils/common/enums/roles");

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: Status.inactiveStatus,
        required: true
    },
    role: {
        type: Number,
        default: Roles.userRoleId,
        required: true
    },
    address: String,
}, { timestamps: true });

// Export the user model
module.exports = mongoose.model("users", userSchema);