import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";



export const getUserById = async(req,res)=>{
    try{
        const id = req.user.id;

        const user = await User.findById(id).select("-password")

        if(!user){
           return res.status(404).json({success:false , message:"User is not found"})
        }

        res.status(200).json({success:true, data:user  ,message:"user is fetched successfully"})

    }catch(error){
        console.log(error);

        res.status(500).json({success:false , message:"Internal server error"})
    }
}


export const UpdatePassword = async(req,res)=>{
    try{

        const {currentPassword , newPassword} = req.body;

        const id = req.user.id;

       if ( !currentPassword.trim() || !newPassword.trim() || 
        typeof currentPassword !== "string" || typeof newPassword !== "string" ){ 
            return res.status(400).json({success:false, message:"provide the old and new passwords" });
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({success:false,message:"failed to fetch the data "})
        }


        const correctPassword = await bcrypt.compare(currentPassword , user?.password);

        if(!correctPassword){
            return res.status(400).json({success:false, message:"password is wrong"});
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({success: false,  message: "New password must differ from current password",});
        }

        const hashedPassword =  await bcrypt.hash(newPassword , 10);

        user.password = hashedPassword;

        await user.save()

        res.status(200).json({ success: true , message: " password updated successfully " });


    }catch(error){
        console.log(error);

        res.status(500).json({success:false , message:"Internal server error"})
    }
}