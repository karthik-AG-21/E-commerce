import Cart from "../models/cartSchema.js";


export const getCart = async (req, res) => {
    try {

        const id = req.user.id;
        console.log("id", id);

        const cart = await Cart.findOne({ user: id }).populate("items.product")


        if (!cart) {
            return res.status(200).json({ success: true, data: { user: id, items: [] }, message: "cart is empty" });
        }

        res.status(200).json({ success: true, data: cart, message: "data fetched successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const createCart = async (req, res) => {
    try {

        const id = req.user.id;

        if (!id) {
            return res.status(404).json({ success: false, message: "token required" });
        }


        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: "provide the cart data" })
        }

        const cart = await Cart.create({
            user: id,
            product: [
                { product: productId, quantity }
            ]
        });

        res.status(201).json({ success: true, data:cart , message: "Cart added successfully" })


    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" })
    }
}