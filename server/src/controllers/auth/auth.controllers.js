import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../../models/user.models.js";
import {Profile} from "../../models/profile.models.js"


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
    
        const existedUser=await User.findOne({email})
        if(existedUser){
            return res.json({
                success:false,
                message:"Email already exists!!"
            }) 
        }

        const hashPassword=await bcrypt.hash(password,12)
        const newUser=new User({
            username,
            email,
            password:hashPassword
        })
        
        const savedUser=await newUser.save()

        const profile=new Profile({
            userId:savedUser._id,
            fullname:savedUser.username,
            email:savedUser.email,
            phone:"",
            gender:"undefined",
            dob:"",
            location:"",
            avatar:""
        })

        await profile.save();

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

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.json({
            success:false,
            message:"User doesn't exist! Please register"
        })

        const checkPassword=await bcrypt.compare(password,existingUser.password);
        if(!checkPassword) return res.json({
            success:false,
            message:"Invalid Password!!"
        })

        const token=jwt.sign({
            id:existingUser._id,
            role:existingUser.role,
            email:existingUser.email,
            username:existingUser.username
        },process.env.JWT_SECRET,{expiresIn:'60m'})
        // console.log(token);
        
        res.cookie("token",token,{
            httpOnly:true,
            secure:false
        }).json({
            success:true,
            message:'Logged in successfully',
            user:{
                id:existingUser._id,
                role:existingUser.role,
                email:existingUser.email,
                username:existingUser.username
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}


//logout

const logoutUser=async(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"logout is successfully"
    })
}





export {registerUser, loginUser, logoutUser}