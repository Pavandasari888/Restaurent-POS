
    const mongoose = require("mongoose");
    require("dotenv").config();
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurantDB";

    const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB Atlas Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1); 
    }
    };

    module.exports = connectDB;
