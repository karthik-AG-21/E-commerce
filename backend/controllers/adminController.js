
import User from "../models/userSchema.js";


// 1) users management 
export const getAllUsers = async(req,res)=>{

    try{

        const users = await User.find({});

        if(users.length==0 || !users){
            return res.status(200).json({success:true, data:users, message:"requested data is not available"})
        }

        return res.status(200).json({success:true,data:users ,message:"Data fetched successfully"})

    }catch(error){
        console.log(error);
        res.status(500).json({success:true, message:"Internal server error"});
    }
}


export const blockUser = async(req, res)=>{
    try{
        const id  = req.params.id;

        const user = await User.findById(id);

        if(!user || user.length==0){
            return res.status(200).json({success:true, message:"user is not exist"});
        }

        const data = user.isBlocked;

        if(data){
            user.isBlocked = false
            user.save()

            res.status(200).json({success:true,message:"User is Unblocked"})
        }else{
            user.isBlocked = true
            user.save()

            res.status(200).json({success:true,message:"User is Blocked"})
        }

        
        

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

// 2) Products management


