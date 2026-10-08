import Cart from "../models/cartSchema.js";


export const getCart = async(req , res)=>{
    try{

        const id = req.user.id;
        console.log("id", id);

        const cart = await Cart.findOne({user : id}).populate("items.product")


        if(!cart){
            return res.status(404).json({success:false , message:"requested data is not found"});
        }

        res.status(200).json({success:true , data:cart , message:"data fetched successfully"})

    }catch(error){
        console.log(error);

        res.status(500).json({success:false , message:"Internal server error"});
    }
}