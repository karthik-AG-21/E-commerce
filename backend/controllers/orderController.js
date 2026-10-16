import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";



export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, paymentMethod } = req.body;
 
       
        if (!["COD", "UPI"].includes(paymentMethod)) {

            return res.status(400).json({success: false, message: "Invalid payment method" });
        }

        
        const requiredFields = ["name", "phone", "street", "city", "state", "zipCode" ];

        if (!address || requiredFields.some((field) =>

        typeof address[field] !== "string" || !address[field].trim())) {

            return res.status(400).json({success: false, message: "Please provide a complete delivery address" });
        }

        
        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Your cart is empty", });
        }

        
        const orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(400).json({ success: false, message: "One or more products in your cart no longer exist" });
            }



            if (product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${product.title}` });
            }

            orderItems.push({product: product._id, quantity: item.quantity, price: product.price,});

            totalAmount += product.price * item.quantity;
        }


        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,
            address: {
                name: address.name.trim(),
                phone: address.phone.trim(),
                street: address.street.trim(),
                city: address.city.trim(),
                state: address.state.trim(),
                zipCode: address.zipCode.trim(),
            },
            paymentMethod,
            status: "pending",
            paymentStatus: "pending",
        });


        cart.items = [];
        await cart.save();

        return res.status(201).json({ success: true, message: "Order placed successfully",  data: order});

    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({ success: false, message: "Failed to create order",});
        
    }


};


export const getMyOrders = async (req, res) => {

    try {

        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
        .populate("items.product", "title price images thumbnail").sort({ createdAt: -1 });

        return res.status(200).json({success: true, count: orders.length, data: orders });

    } catch (error) {
        
        console.error("Get orders error:", error);

        return res.status(500).json({ success: false, message: "Failed to retrieve orders" });

        
    }

};
