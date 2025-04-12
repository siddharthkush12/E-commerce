import { Profile } from "../../models/profile.models.js";



const fetchProfile=async(req,res)=>{
    try {
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"All field required"
            })
        }

        const profile=await Profile.findOne({userId}).populate("userId","email username")
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }
        return res.status(200).json({
            success:true,
            data:profile
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}


const editProfile=async(req,res)=>{
    try {
        const {userId}=req.params;
        const {phone,gender,dob,location}=req.body;
        
        if(!userId||!phone||!gender||!dob||!location){
            return res.status(400).json({
                success:false,
                message:"All field required"
            })
        }

        const profile=await Profile.findOne({userId})
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }

        profile.phone = phone || profile.phone;
        profile.gender = gender || profile.gender;
        profile.dob = dob || profile.dob;
        profile.location = location || profile.location;

        await profile.save();
        return res.status(200).json({
            success:true,
            data:profile
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}





export {editProfile,fetchProfile}