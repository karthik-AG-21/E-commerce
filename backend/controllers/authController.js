import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
        const {name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false, message:"data is not found"})
        };

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({success:false, message:"user is  exists in the db"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);


        const user = await User.create({name:name, email:email, password:hashedPassword});

        const token = jwt.sign({id:user?._id , role:user?.role}, process.env.JWT_SECRET, {expiresIn:"15m"});

        const refreshToken = jwt.sign({id:user._id, role:user?.role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"});

        res.cookie("accessToken", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:15*60*1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })


        res.status(201).json({success:true, data:{id:user._id, role:user.role  , name:user.name, email:user.email}, message:"register successfull"})

    }catch(error){
        console.log(error);

        res.status(500).json({success:false , message:"Internal Server error"});
    }
}


export const login = async(req,res)=>{
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message:"Email and password is required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success:false, message:"User is not found"});
        };

        if(user.isBlocked){
            return res.status(403).json({success:false , message:"User is blocked"})
        }

        const correctPassword = await  bcrypt.compare(password , user.password)

        if(!correctPassword){
            return res.status(401).json({success:false, message:"incorrect password"})
        }

        const token = jwt.sign({id:user._id, role:user?.role}, process.env.JWT_SECRET, {expiresIn:"15m"});
        
        const refreshToken = jwt.sign({id:user._id, role:user?.role}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"});

        res.cookie("accessToken", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:15*60*1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })

        res.status(200).json({success:true, data:{id:user._id,name:user.name , email:user.email, }, message:"login successfull"});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false , message:"Internal server error"});
    }
}