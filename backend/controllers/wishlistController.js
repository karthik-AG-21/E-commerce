
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

export const addToWishlist = async (req, res) => {
    try {

        const id = req.user.id;

        const { productId  } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "provide the wishlist Data" });
        };

        let wishlist = await Wishlist.findOne({user:id});

        if(!wishlist){
            wishlist = await Wishlist.create({
            user: id,
            items: [{
                product: productId
            }]
        });

        return res.status(200).json({ success: true, data: wishlist, message: "wishlist added successfully" });

        }


        const exists = wishlist.items.some(item=>item.product.toString() === productId)


        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Product already exists in wishlist"
            });
        }

         wishlist.items.push({product: productId});

        await wishlist.save();

        return res.status(200).json({success:true,    data:wishlist,  message:"Product added to wishlist"});

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            {
                $pull: {
                    items: { product: productId },
                },
            },
            { new: true }
        );

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: wishlist,
            message: "Product removed from wishlist successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};