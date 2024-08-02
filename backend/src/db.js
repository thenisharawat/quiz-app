const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let db = await mongoose.connect((process.env?.MONGO_URL + ""));
        console.log('MongoDB connected:- ', db.connection.name);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const db = mongoose.connection;
module.exports = { connectDB, db };
