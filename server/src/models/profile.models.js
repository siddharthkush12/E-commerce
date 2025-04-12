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

// profileSchema.pre('save',async function(next){
//     try {
//         const user=await User.findById(this.userId)
//         if(user){
//             this.email=user.email;
//             this.fullname=user.username;
//         }
//         next();
//     } catch (error) {
//         next(error)
//     }
// })

export const Profile=mongoose.model("Profile",profileSchema)