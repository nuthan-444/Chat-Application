const mongoose = require('mongoose');


const connectDB = async() => {
    try{
       const conn = await mongoose.connect(`${process.env.MONGODB_URL}/ChatApplication`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        // Stop server if DB fails to connect
        process.exit(1); 
    }
};

module.exports = connectDB;