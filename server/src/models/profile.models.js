import mongoose from "mongoose"

const profileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    avatar:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','undefined'],
        default:"undefined"
    },
    dob:{
        type:String,
    },
    location:{
        type:String,
    }
    
},{timestamps:true})



export const Profile=mongoose.model("Profile",profileSchema)