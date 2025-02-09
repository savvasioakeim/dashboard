const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection open");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = connectDB;
