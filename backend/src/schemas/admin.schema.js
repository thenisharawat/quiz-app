const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Status } = require('../utils/common/enums/status');
const { Roles } = require('../utils/common/enums/roles');

// Define the schema
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    mobile_number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: Status.activeStatus,
    },
    role: {
        type: Number,
        required: true,
        default: Roles.adminRoleId,
    },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('admins', adminSchema);
