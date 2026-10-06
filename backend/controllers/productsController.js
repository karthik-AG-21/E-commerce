import Product from "../models/productSchema.js";

export const createProduct = async(req,res)=>{
    try{

        const product = req.body

        if(!product || Object.keys(product).length === 0){
            res.status(400).json({success:false, message:"Data not found"});
        };

        const products = await Product.create(product)

        if(!product){
            return res.status(401).json({success:false, message:"Data is not saved"})
        };

        res.status(201).json({success:true, data:[products]  , message:"Data saved successfully"})

    }catch(error){
        console.log(error);

        res.status(500).json({success:false , message:"Internal server error"});
    }
}