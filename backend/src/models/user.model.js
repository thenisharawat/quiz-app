const { ObjectId } = require("mongodb");
const userSchema = require("../schemas/user.schema");

const userModelSchema = userSchema;

const userModel = {
    createUser: async (userData) => {
        const user = new userModelSchema(userData);
        return await user.save();
    },
    getUserByEmail: async (email) => {
        let result = await userModelSchema.findOne({ email: email }).lean();
        return result;
    },
    getUserById: async (id) => {
        let userResult = await userModelSchema.findOne({ _id: id }).lean();
        return userResult;
    },
    getAllUsers: async () => {
        let usersResult = await userModelSchema.find().lean();
        return usersResult;
    },
    updateUserById: async (id, userData) => {
        let result = await userModelSchema.findOneAndUpdate({ _id: id }, {
            $set: userData
        }, { new: true });
        return result;
    },
}

module.exports = userModel;