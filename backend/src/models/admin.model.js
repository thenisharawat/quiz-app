const Admin = require('../schemas/admin.schema'); // Import the model

/* Service Methods */

module.exports = {
    // Save admin
    saveAdmin: async (adminData) => {
        const admin = new Admin(adminData);
        return await admin.save();
    },
    // Get admin
    getAdmin: async (email) => {
        const adminResult = await Admin.findOne({ email }).lean();
        return adminResult;
    },
};
