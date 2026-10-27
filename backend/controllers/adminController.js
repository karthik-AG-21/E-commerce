import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";


export const getAllUsers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;

        const search = req.query.search || "";
        const filter = req.query.filter || "";
        const sort = req.query.sort || "newest-users";


        const query = { role: { $ne: "admin" } };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter users
        if (filter === "active") {
            query.isBlocked = false;
        } else if (filter === "inactive") {
            query.isBlocked = true;
        }


        let sortOption = { createdAt: -1 };

        if (sort === "a-z") sortOption = { name: 1 };
        if (sort === "z-a") sortOption = { name: -1 };
        if (sort === "oldest-users") sortOption = { createdAt: 1 };

        // Get users and count
        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query).select("-password").sort(sortOption).skip((page - 1) * limit).limit(limit);

        const usersWithOrders = [];

        for (const user of users) {
            const orderCount = await Order.countDocuments({
                user: user._id,
            });

            usersWithOrders.push({
                ...user.toObject(),
                orders: orderCount,
            });
        }

        return res.status(200).json({
            success: true,
            data: usersWithOrders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                limit,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const blockUser = async (req, res) => {
    try {
        
        const { userId , status } = req.body;

        if (typeof status !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Status must be a boolean",
            });
        }

        const user = await User.findOneAndUpdate({ _id: userId, role: { $ne: "admin" }, }, { $set: { isBlocked: status }, },
            { returnDocument: true, runValidators: true, }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: status ? "User blocked successfully" : "User unblocked successfully",
            user,
        });
    } catch (error) {
        console.error("Update user status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user status",
        });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const search = req.query.search || "";
        const filter = req.query.filter || "";

        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        const sortOptions = {
            "high-low": { price: -1 },
            "low-high": { price: 1 },
            rating: { rating: -1 },
            stock: { stock: -1 },
        };

        const sortOption = sortOptions[filter] || { _id: -1 };

        const [products, totalProducts] = await Promise.all([
            Product.find(query)
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(limit),

            Product.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                limit,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const createProduct = async (req, res) => {
    try {
        const { title, category, price, stock, rating, image } = req.body;

        if (!title?.trim() || !category?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Product title and category are required",
            });
        }

        if (price == null || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0",
            });
        }

        const product = await Product.create({
            title: title.trim(),
            category: category.trim(),
            price: Number(price),
            stock: Number(stock ?? 0),
            rating: Number(rating ?? 0),
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id,{ $set: req.body },{returnDocument: "after", runValidators: true,});

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            data: orders,
            message: "orders fetched successfully"
        });
    } catch (error) {
        console.error("GET ALL ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


