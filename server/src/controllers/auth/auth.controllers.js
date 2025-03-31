import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.models.js";



// Register

const registerUser=async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        if (!username || !email || !password || password.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
    
        const existedUser=await User.findOne({
            $or:[{email}],
        })
        if(existedUser){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            }) 
        }

        const hashPassword=await bcrypt.hash(password,12)
        const newUser=new User({
            username,
            email,
            password:hashPassword
        })
        
        await newUser.save()

        res.status(201).json({
            success:true,
            message:"Registration successfull"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}


//Login

// const loginUser=async(req,res)=>{
//     const {uemail,password}=req.body;
//     try {
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success:false,
//             message:"some error occured"
//         })
//     }
// }






export {registerUser}