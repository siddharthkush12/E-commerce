import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim:true
      },
      password: { 
        type: String,
        required: [true, "Password is required"],
      },
      role:{
        type:String,
        default:'user',
        enum:['user','admin']
      }
},{timestamps:true});

export const User=mongoose.model("User",userSchema)