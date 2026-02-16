const mongoose = require('mongoose');


const connectDB = async() => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}/ChatApplication`);
       console.log("MONGODB CONNECTED : ",`${process.env.MONGODB_URL}/ChatApplication`);
    } catch(error){
        console.log("MONGOOSE CONNECTION ERROR. ",error);
    }
}

module.exports = connectDB;