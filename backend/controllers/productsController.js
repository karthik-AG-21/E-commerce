import Product from "../models/productSchema.js";

export const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        if (!products) {
            return res.status(404).json({ success: false, messgae: "product is not found" });
        }

        
        res.status(200).json({ success: true, data: [...products], message: "the Data is fetched successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category;

        let products;

        if (category && category !== "all") {
            products = await Product.find({ category: category });

        } else {
            products = await Product.find({})
        }


        // console.log("Is Array:", Array.isArray(products));

        if (products.length === 0 || !products) {
           return res.status(404).json({ success: false, message: "requested data is not found" });
        }

         res.status(200).json({ success: false, data: products, message: "data fetched successfully" })

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getProductById = async(req,res)=>{
    try{

        const id = String(req.params.id);

        if(!id){
            return res.status(400).json({success:false,message:"id is not defined"})
        }

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({success:false ,message:"data is not found"});
        }


        res.status(200).json({success:true, data:product , message:"data fetched successfully"})


    }catch(error){
        console.log(error);

        res.status(500).json({success:false,message:"Internal server error"})
    }
};


