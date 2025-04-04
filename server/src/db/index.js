import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDb=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongoDB conneced !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED TO CONNECT",error);
        process.exit(1);
    }
}

export default connectDb;