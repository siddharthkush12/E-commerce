import { app } from "./app.js";
import connectDb from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
})


connectDb()
    .then(()=>{
        app.listen(process.env.PORT||8000,()=>{
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error)=>{
        console.log("Mongo db connection failed!!!",error);
        
    });