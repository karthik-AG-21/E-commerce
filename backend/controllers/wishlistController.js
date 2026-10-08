
import Wishlist from "../models/wishlistSchema.js";



export const getWishlist = async (req, res) => {
    try {

        const id = req.user.id;

        const wishlist = await Wishlist.findOne({ user: id }).populate("items.product")

        if(!wishlist){
            return res.status(200).json({success:true, message:"wishlist is empty"});  
        }

        res.status(200).json({success:true , data:wishlist ,message:"wishlist is fetched successfully"})

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createWishlist = async (req, res) => {
    try {

        const id = req.user.id;

        const { productId, quantity } = req.body;

        if (!id) {
            return res.status(401).json({ success: false, message: "ID is required" });
        };

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: "provide the wishlist Data" });
        };

        const wishlist = await Wishlist.create({
            user: id,
            items: [{
                product: productId,
                quantity: quantity
            }]
        });

        if (!wishlist) {
            return res.status(200).json({ success: true, data: { user: id, items: [] }, message: "wishlist is empty" });
        }


        res.status(200).json({ success: true, data: wishlist, message: "wishlist added successfully" });



    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}