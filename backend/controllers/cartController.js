import Cart from "../models/cartSchema.js";


export const getCart = async (req, res) => {
    try {

        const id = req.user.id;
        console.log("id", id);

        const cart = await Cart.findOne({ user: id }).populate("items.product")


        if (!cart) {
            return res.status(200).json({ success: true, data: { user: id, items: [] }, message: "cart is empty" });
        }

        return res.status(200).json({ success: true, data: cart, message: "data fetched successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createCart = async (req, res) => {
    try {
        const id = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer"
            });
        }

        // Find the user's existing cart
        let cart = await Cart.findOne({ user: id });

        // Create a cart only if one doesn't exist
        if (!cart) {
            cart = await Cart.create({
                user: id,
                items: [{ product: productId, quantity }]
            });

            return res.status(201).json({
                success: true,
                data: cart,
                message: "Cart created successfully"
            });
        }

        // Check whether the product already exists
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            data: cart,
            message: "Product added to cart successfully"
        });

    } catch (error) {
        console.error("Cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }


};


export const removeCart = async (req, res) => {
    try {

        const id = req.user.id;

        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Bad request must provide product id" });
        }

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $pull: {
                    items: { product: productId }
                }
            },

            { new: true });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({ success: true, data: cart, message: "Product removed from cart successfully" });

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
