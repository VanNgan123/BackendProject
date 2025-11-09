const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("MongoDB connected"); 
    } catch (error) {
        console.log("🚀 ~ connectDB ~ MongoDB connection failed",error.message)
        process.exit(1);
    }
}
module.exports= connectDB;