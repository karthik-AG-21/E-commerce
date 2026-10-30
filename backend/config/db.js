import mongoose from "mongoose"


export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)

        console.log("connected")
        console.log("Database:", mongoose.connection.name);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}