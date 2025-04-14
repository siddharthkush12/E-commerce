import jwt from "jsonwebtoken"

export const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message:"unauthorised user!"
    })
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"unauthorised user!"
        })
    }
}
